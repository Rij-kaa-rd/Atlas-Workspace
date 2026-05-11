const THEME_KEY = "atlas-theme";

export function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || "light";
  document.documentElement.dataset.theme = savedTheme;
  return savedTheme;
}

export function setTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  return nextTheme;
}

export function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme || "light";
  return setTheme(currentTheme === "dark" ? "light" : "dark");
}
