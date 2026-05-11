import {
  renderRuntimeApp,
  renderRuntimeEmptyState,
  renderRuntimeSidebar,
  renderRuntimeSyncBadge,
  renderRuntimeTopbar,
  setRuntimeActiveView,
} from "../app.runtime.js";

export function renderApp() {
  renderRuntimeApp();
}

export function renderSidebar() {
  renderRuntimeSidebar();
}

export function renderTopbar() {
  renderRuntimeTopbar();
}

export function renderEmptyState(icon, title, subtitle, actionText = "", actionAttribute = "") {
  return renderRuntimeEmptyState(icon, title, subtitle, actionText, actionAttribute);
}

export function renderSyncBadge(status) {
  renderRuntimeSyncBadge(status);
}

export function setActiveView(viewName) {
  setRuntimeActiveView(viewName);
}
