import { openRuntimeDialog } from "../app.runtime.js";

export function initModals() {
  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog")?.close();
    }, { once: true });
  });
}

export function openModal(id) {
  const dialog = document.getElementById(id);
  if (!dialog) return;
  openRuntimeDialog(dialog);
}

export function closeModal(id) {
  document.getElementById(id)?.close();
}

export function openSettingsModal() {
  openModal("settingsDialog");
}

export function closeSettingsModal() {
  closeModal("settingsDialog");
}
