import { hasFirebaseConfig, getFirebaseConfig } from "../config/firebase.config.js";
import {
  getRuntimeSyncStatus,
  loadRuntimeWorkspaceFromCloud,
  syncRuntimeWorkspaceToCloud,
  updateRuntimeSyncStatus,
} from "../app.runtime.js";

let firebaseApp = null;
let firestoreClient = null;

export async function initFirebaseApp() {
  if (!hasFirebaseConfig()) {
    updateSyncStatus("Local mode");
    return null;
  }

  const config = getFirebaseConfig();
  if (!window.firebase?.initializeApp) {
    updateSyncStatus("Error");
    return null;
  }

  try {
    const appName = `atlas-${config.projectId}`;
    firebaseApp = window.firebase.apps.find((app) => app.name === appName)
      || window.firebase.initializeApp(config, appName);
    initFirestore();
    return firebaseApp;
  } catch (error) {
    updateSyncStatus("Error");
    console.warn("[firebase.service] Firebase initialization failed:", error);
    firebaseApp = null;
    firestoreClient = null;
    return null;
  }
}

export function initFirestore() {
  const config = getFirebaseConfig();
  if (!window.firebase?.firestore || !config.projectId) return null;

  const app = window.firebase.apps.find((item) => item.name === `atlas-${config.projectId}`);
  firestoreClient = app ? window.firebase.firestore(app) : null;

  // Firebase compat persistence is isolated here so future upgrades only touch this service.
  firestoreClient?.enablePersistence?.({ synchronizeTabs: true }).catch(() => {});
  return firestoreClient;
}

export function syncWorkspaceToCloud() {
  return syncRuntimeWorkspaceToCloud();
}

export function loadWorkspaceFromCloud() {
  return loadRuntimeWorkspaceFromCloud();
}

export function updateSyncStatus(status) {
  updateRuntimeSyncStatus(status);
}

export function getSyncStatus() {
  return getRuntimeSyncStatus();
}
