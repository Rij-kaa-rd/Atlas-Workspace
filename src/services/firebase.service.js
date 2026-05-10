import { firebaseConfig } from "../config/firebase.config.js";

let firebaseApp = null;
let authClient = null;
let firestoreClient = null;
let currentUser = null;

const APP_NAME = `atlas-${firebaseConfig.projectId}`;
const WORKSPACE_DOC_ID = "workspace";

export function isFirebaseAvailable() {
  return Boolean(window.firebase?.initializeApp);
}

export function initFirebaseService({ onAuthChanged, onStatus, onError } = {}) {
  if (!isFirebaseAvailable()) {
    onStatus?.("Firebase SDK belum siap");
    return null;
  }

  try {
    const existingApp = window.firebase.apps.find((app) => app.name === APP_NAME);

    firebaseApp = existingApp || window.firebase.initializeApp(firebaseConfig, APP_NAME);
    authClient = window.firebase.auth(firebaseApp);
    firestoreClient = window.firebase.firestore(firebaseApp);

    firestoreClient.enablePersistence({ synchronizeTabs: true }).catch(() => {});

    authClient.onAuthStateChanged((user) => {
      currentUser = user;
      onAuthChanged?.(user);
    });

    onStatus?.("Cloud siap");

    return {
      app: firebaseApp,
      auth: authClient,
      db: firestoreClient
    };
  } catch (error) {
    firebaseApp = null;
    authClient = null;
    firestoreClient = null;
    currentUser = null;

    onStatus?.("Firebase config error");
    onError?.(error);

    return null;
  }
}

export function getCurrentUser() {
  return currentUser;
}

export function getAuthClient() {
  return authClient;
}

export function getFirestoreClient() {
  return firestoreClient;
}

export function hasCloudSession() {
  return Boolean(currentUser && firestoreClient);
}

export async function signInWithEmail(email, password) {
  if (!authClient) {
    throw new Error("Firebase Auth belum siap.");
  }

  return authClient.signInWithEmailAndPassword(email, password);
}

export async function signUpWithEmail({ name, email, password }) {
  if (!authClient) {
    throw new Error("Firebase Auth belum siap.");
  }

  const credential = await authClient.createUserWithEmailAndPassword(email, password);

  if (name && credential.user) {
    await credential.user.updateProfile({ displayName: name });
  }

  return credential;
}

export async function signOutFirebase() {
  if (!authClient) {
    return;
  }

  await authClient.signOut();
}

export async function pullWorkspaceState() {
  if (!currentUser || !firestoreClient) {
    return null;
  }

  const docRef = firestoreClient
    .collection("users")
    .doc(currentUser.uid)
    .collection("private")
    .doc(WORKSPACE_DOC_ID);

  const snapshot = await docRef.get();

  if (!snapshot.exists) {
    return null;
  }

  return snapshot.data();
}

export async function pushWorkspaceState(state) {
  if (!currentUser || !firestoreClient) {
    return;
  }

  const docRef = firestoreClient
    .collection("users")
    .doc(currentUser.uid)
    .collection("private")
    .doc(WORKSPACE_DOC_ID);

  await docRef.set(
    {
      ...state,
      updatedAt: new Date().toISOString()
    },
    { merge: true }
  );
}