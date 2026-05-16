import { getCurrentUser, signOutUser } from "../../services/auth.service.js";
import { renderUser } from "../../ui/user.render.js";

export function renderAuthState() {
  renderUser({ user: getCurrentUser() });
}

export function bindAuthEvents() {
  const authButton = document.getElementById("authButton");
  authButton?.addEventListener("atlas:logout", () => {
    void signOutUser();
  });
}
