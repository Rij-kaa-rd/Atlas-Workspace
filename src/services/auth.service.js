import {
  getRuntimeCurrentUser,
  logoutRuntimeUser,
  renderAuthState,
} from "../app.runtime.js";

const authListeners = new Set();

export async function initAuth() {
  return getCurrentUser();
}

export async function loginWithGoogle() {
  if (!window.firebase?.auth) {
    throw new Error("Firebase Auth is not ready.");
  }

  const provider = new window.firebase.auth.GoogleAuthProvider();
  const app = window.firebase.apps[0];
  if (!app) throw new Error("Firebase app is not initialized.");

  return window.firebase.auth(app).signInWithPopup(provider);
}

export function logoutUser() {
  return logoutRuntimeUser();
}

export function getCurrentUser() {
  return getRuntimeCurrentUser();
}

export function onAuthChange(callback) {
  if (typeof callback !== "function") {
    throw new Error("Auth listener must be a function.");
  }

  authListeners.add(callback);
  callback(getCurrentUser());

  return () => authListeners.delete(callback);
}

export function notifyAuthChange(user = getCurrentUser()) {
  renderAuthState();
  authListeners.forEach((callback) => callback(user));
}
