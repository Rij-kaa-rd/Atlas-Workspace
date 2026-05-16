import { subscribe as subscribeStore } from "../state/store.js";
import { getCurrentUser } from "./auth.service.js";
import {
  loadWorkspaceFromCloud,
  saveWorkspaceToCloud,
  subscribeWorkspace,
} from "./firestore.service.js";
import { isFirebaseReady } from "./firebase.service.js";

let syncContext = null;
let currentUser = null;
let syncStatus = "local";
let unsubscribeCloud = null;
let unsubscribeStore = null;
let saveTimer = null;
let applyingCloudState = false;

export function initCloudSync({
  getState,
  replaceState,
  saveLocalState,
  renderAll,
  setUserSession,
  setSyncStatus,
}) {
  stopCloudSync();

  syncContext = {
    getState,
    replaceState,
    saveLocalState,
    renderAll,
    setUserSession,
    setSyncStatus,
  };
  currentUser = getCurrentUser();

  if (!currentUser) {
    updateStatus("local");
    return;
  }

  if (!isFirebaseReady()) {
    updateStatus("error");
    return;
  }

  unsubscribeStore = subscribeStore(() => {
    if (!currentUser || applyingCloudState) return;
    queueCloudSave();
  });

  void connectCloudWorkspace();
}

export async function syncNow() {
  if (!syncContext || !currentUser || !isFirebaseReady()) {
    updateStatus(currentUser ? "error" : "local");
    return false;
  }

  updateStatus("syncing");
  const ok = await saveWorkspaceToCloud(currentUser.uid, syncContext.getState());
  updateStatus(ok ? "synced" : "error");
  return ok;
}

export function queueCloudSave() {
  if (!syncContext || !currentUser || applyingCloudState) return;

  updateStatus("syncing");
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    void syncNow();
  }, 500);
}

export function stopCloudSync() {
  clearTimeout(saveTimer);
  saveTimer = null;

  if (unsubscribeCloud) unsubscribeCloud();
  if (unsubscribeStore) unsubscribeStore();

  unsubscribeCloud = null;
  unsubscribeStore = null;
  currentUser = null;
  applyingCloudState = false;
}

export function getSyncStatus() {
  return syncStatus;
}

async function connectCloudWorkspace() {
  updateStatus("connecting");

  try {
    const localState = syncContext.getState();
    const cloudState = await loadWorkspaceFromCloud(currentUser.uid);
    const cloudIsNewer = compareUpdatedAt(cloudState, localState) > 0;

    if (cloudState && cloudIsNewer) {
      applyCloudState(cloudState);
    } else if (!cloudState || compareUpdatedAt(localState, cloudState) >= 0) {
      await saveWorkspaceToCloud(currentUser.uid, localState);
    }

    unsubscribeCloud = subscribeWorkspace(currentUser.uid, (cloudSnapshot, error) => {
      if (error) {
        updateStatus("error");
        return;
      }

      if (!cloudSnapshot || applyingCloudState) return;

      const localSnapshot = syncContext.getState();
      if (compareUpdatedAt(cloudSnapshot, localSnapshot) > 0) {
        applyCloudState(cloudSnapshot);
      }

      updateStatus("synced");
    });

    updateStatus("cloud-ready");
    updateStatus("synced");
  } catch (error) {
    console.warn("[cloud-sync.service] Cloud sync failed:", error);
    updateStatus("error");
  }
}

function applyCloudState(cloudState) {
  applyingCloudState = true;

  try {
    syncContext.replaceState(cloudState);
    syncContext.renderAll?.();
  } finally {
    applyingCloudState = false;
  }
}

function updateStatus(status) {
  syncStatus = status;
  syncContext?.setSyncStatus?.(status);
}

function compareUpdatedAt(left, right) {
  const leftTime = new Date(left?.updatedAt || 0).getTime();
  const rightTime = new Date(right?.updatedAt || 0).getTime();
  return leftTime - rightTime;
}
