import { storageKeys } from "../services/storage.service.js";

export function initTheme() {
  const savedTheme = localStorage.getItem(storageKeys.theme) || "light";
  document.documentElement.dataset.theme = savedTheme;
  return savedTheme;
}

export function setTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(storageKeys.theme, nextTheme);
  return nextTheme;
}

export function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme || "light";
  return setTheme(currentTheme === "dark" ? "light" : "dark");
}
