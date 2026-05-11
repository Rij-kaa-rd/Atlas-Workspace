const CLOUD_CONFIG_KEY = "atlas_workspace_cloud_v1";

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDDaZN9mPXPGrBMYykTnwguNsJp27JPLow",
  authDomain: "atlas-workspace-af04b.firebaseapp.com",
  projectId: "atlas-workspace-af04b",
  storageBucket: "atlas-workspace-af04b.firebasestorage.app",
  messagingSenderId: "1090000836099",
  appId: "1:1090000836099:web:185ac63fa0d34b965de036",
  measurementId: "G-NJK0P498EJ",
};

function safeJson(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function getFirebaseConfig() {
  const saved = safeJson(localStorage.getItem(CLOUD_CONFIG_KEY));
  return saved ? { ...DEFAULT_FIREBASE_CONFIG, ...saved } : { ...DEFAULT_FIREBASE_CONFIG };
}

export function saveFirebaseConfig(config) {
  const nextConfig = {
    apiKey: config?.apiKey?.trim?.() || "",
    authDomain: config?.authDomain?.trim?.() || "",
    projectId: config?.projectId?.trim?.() || "",
    appId: config?.appId?.trim?.() || "",
  };
  localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(nextConfig));
  return nextConfig;
}

export function hasFirebaseConfig() {
  const config = getFirebaseConfig();
  return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}

export function clearFirebaseConfig() {
  const localConfig = { apiKey: "", authDomain: "", projectId: "", appId: "" };
  localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(localConfig));
  return localConfig;
}

export { CLOUD_CONFIG_KEY, DEFAULT_FIREBASE_CONFIG };
