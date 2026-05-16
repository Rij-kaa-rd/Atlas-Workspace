import { isFirebaseConfigValid } from "../config/firebase.config.js";

let firebaseApp = null;
let authClient = null;
let firestoreClient = null;
let persistenceRequested = false;
let lastError = null;

export function initFirebase(config) {
  if (!isFirebaseConfigValid(config)) {
    lastError = new Error("Firebase config is incomplete.");
    firebaseApp = null;
    authClient = null;
    firestoreClient = null;
    return { ok: false, error: lastError };
  }

  if (!window.firebase?.initializeApp) {
    lastError = new Error("Firebase compat SDK is not available.");
    firebaseApp = null;
    authClient = null;
    firestoreClient = null;
    return { ok: false, error: lastError };
  }

  try {
    firebaseApp = getExistingApp(config) || window.firebase.initializeApp(config);
    authClient = window.firebase.auth ? window.firebase.auth(firebaseApp) : null;
    firestoreClient = window.firebase.firestore ? window.firebase.firestore(firebaseApp) : null;

    enablePersistenceWhenSafe();
    lastError = null;

    return {
      ok: true,
      app: firebaseApp,
      auth: authClient,
      firestore: firestoreClient,
    };
  } catch (error) {
    lastError = error;
    firebaseApp = null;
    authClient = null;
    firestoreClient = null;
    console.warn("[firebase.service] Firebase initialization failed:", error);
    return { ok: false, error };
  }
}

export function getFirebaseApp() {
  return firebaseApp;
}

export function getFirebaseAuth() {
  return authClient;
}

export function getFirestore() {
  return firestoreClient;
}

export function isFirebaseReady() {
  return Boolean(firebaseApp && authClient && firestoreClient && !lastError);
}

function getExistingApp(config) {
  const apps = window.firebase?.apps || [];
  return apps.find((app) => app?.options?.projectId === config.projectId) || apps[0] || null;
}

function enablePersistenceWhenSafe() {
  if (!firestoreClient || persistenceRequested) return;

  persistenceRequested = true;
  firestoreClient.enablePersistence?.({ synchronizeTabs: true }).catch(() => {});
}
