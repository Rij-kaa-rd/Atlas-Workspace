import { getFirebaseAuth } from "./firebase.service.js";

let currentUser = null;

export function onAuthStateChanged(callback) {
  const auth = getFirebaseAuth();

  if (!auth?.onAuthStateChanged) {
    currentUser = null;
    callback?.(null);
    return () => {};
  }

  return auth.onAuthStateChanged((user) => {
    currentUser = user || null;
    callback?.(currentUser);
  });
}

export async function signInWithEmail(email, password) {
  const auth = getFirebaseAuth();
  if (!auth?.signInWithEmailAndPassword) {
    throw new Error("Firebase Auth is not available.");
  }

  const credential = await auth.signInWithEmailAndPassword(email, password);
  currentUser = credential.user || null;
  return credential;
}

export async function signUpWithEmail(name, email, password) {
  const auth = getFirebaseAuth();
  if (!auth?.createUserWithEmailAndPassword) {
    throw new Error("Firebase Auth is not available.");
  }

  const credential = await auth.createUserWithEmailAndPassword(email, password);

  if (name && credential.user?.updateProfile) {
    await credential.user.updateProfile({ displayName: name });
  }

  currentUser = credential.user || null;
  return credential;
}

export async function signOutUser() {
  const auth = getFirebaseAuth();
  if (!auth?.signOut) return;

  await auth.signOut();
  currentUser = null;
}

export function getCurrentUser() {
  return currentUser || getFirebaseAuth()?.currentUser || null;
}
