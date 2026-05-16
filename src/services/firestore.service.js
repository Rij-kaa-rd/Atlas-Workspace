import { getTodayISO } from "../utils/helpers.js";
import { getFirestore } from "./firebase.service.js";

const workspaceDocPath = (uid) => `users/${uid}/private/workspace`;

export async function loadWorkspaceFromCloud(uid) {
  const db = getFirestore();
  if (!db || !uid) return null;

  try {
    const snapshot = await db.doc(workspaceDocPath(uid)).get();
    return snapshot.exists ? snapshot.data() : null;
  } catch (error) {
    console.warn("[firestore.service] Failed to load workspace:", error);
    return null;
  }
}

export async function saveWorkspaceToCloud(uid, workspaceState) {
  const db = getFirestore();
  if (!db || !uid || !workspaceState) return false;

  try {
    await db.doc(workspaceDocPath(uid)).set(
      {
        ...workspaceState,
        updatedAt: workspaceState.updatedAt || getTodayISO(),
      },
      { merge: true },
    );
    return true;
  } catch (error) {
    console.warn("[firestore.service] Failed to save workspace:", error);
    return false;
  }
}

export function subscribeWorkspace(uid, callback) {
  const db = getFirestore();
  if (!db || !uid) return () => {};

  return db.doc(workspaceDocPath(uid)).onSnapshot(
    (snapshot) => {
      callback?.(snapshot.exists ? snapshot.data() : null);
    },
    (error) => {
      console.warn("[firestore.service] Workspace subscription failed:", error);
      callback?.(null, error);
    },
  );
}
