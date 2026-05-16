import {
  loadFromStorage,
  removeFromStorage,
  saveToStorage,
  storageKeys,
} from "../services/storage.service.js";

const LEGACY_CLOUD_CONFIG_KEY = "atlas_workspace_cloud_v1";

export const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDDaZN9mPXPGrBMYykTnwguNsJp27JPLow",
  authDomain: "atlas-workspace-af04b.firebaseapp.com",
  projectId: "atlas-workspace-af04b",
  storageBucket: "atlas-workspace-af04b.firebasestorage.app",
  messagingSenderId: "1090000836099",
  appId: "1:1090000836099:web:185ac63fa0d34b965de036",
  measurementId: "G-NJK0P498EJ",
};

export function isFirebaseConfigValid(config) {
  return Boolean(
    config &&
      config.apiKey &&
      config.authDomain &&
      config.projectId &&
      config.appId,
  );
}

export function getFirebaseConfig() {
  const saved =
    loadFromStorage(storageKeys.cloudConfig, null) ||
    loadFromStorage(LEGACY_CLOUD_CONFIG_KEY, null);

  return saved
    ? { ...DEFAULT_FIREBASE_CONFIG, ...saved }
    : { ...DEFAULT_FIREBASE_CONFIG };
}

export function saveFirebaseConfig(config = {}) {
  const nextConfig = {
    ...DEFAULT_FIREBASE_CONFIG,
    apiKey: config.apiKey?.trim?.() || "",
    authDomain: config.authDomain?.trim?.() || "",
    projectId: config.projectId?.trim?.() || "",
    appId: config.appId?.trim?.() || "",
  };

  saveToStorage(storageKeys.cloudConfig, nextConfig);
  return nextConfig;
}

export function clearFirebaseConfig() {
  removeFromStorage(storageKeys.cloudConfig);
  removeFromStorage(LEGACY_CLOUD_CONFIG_KEY);
  return { ...DEFAULT_FIREBASE_CONFIG };
}
