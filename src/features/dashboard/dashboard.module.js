import { getState } from "../../state/store.js";
import { sortByUpdatedAt } from "../../utils/helpers.js";
import { renderDashboard as renderDashboardView } from "./dashboard.render.js";

export function renderDashboard() {
  const state = getState();
  renderDashboardView({ state, filteredPages: state.pages || [] });
}

export function getDashboardStats(pages = getState()?.pages || []) {
  return {
    totalPages: pages.length,
    doing: pages.filter((page) => page.status === "doing").length,
    review: pages.filter((page) => page.status === "review").length,
    activeReminders: pages.filter((page) => page.reminderAt && !page.reminderDone).length,
  };
}

export function getRecentPages(pages = getState()?.pages || [], limit = 5) {
  return sortByUpdatedAt(pages).slice(0, limit);
}

export function getDueSoonReminders(pages = getState()?.pages || [], limit = 5) {
  return pages
    .filter((page) => page.reminderAt && !page.reminderDone)
    .sort((a, b) => new Date(a.reminderAt) - new Date(b.reminderAt))
    .slice(0, limit);
}
