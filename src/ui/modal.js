export function initModals() {
  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest("dialog")?.close();
    });
  });
}

export function openModal(id) {
  const dialog = document.getElementById(id);
  if (!dialog) return;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
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
