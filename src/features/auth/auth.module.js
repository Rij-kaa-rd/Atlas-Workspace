import { renderAuthState as renderRuntimeAuthState } from "../../app.runtime.js";
import { logoutUser } from "../../services/auth.service.js";

export function renderAuthState() {
  renderRuntimeAuthState();
}

export function bindAuthEvents() {
  const authButton = document.getElementById("authButton");
  authButton?.addEventListener("atlas:logout", () => {
    logoutUser();
  });
}
