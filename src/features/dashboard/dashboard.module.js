import { getRuntimeState, renderDashboard as renderRuntimeDashboard } from "../../app.runtime.js";
import { sortByUpdatedAt } from "../../utils/helpers.js";

export function renderDashboard() {
  renderRuntimeDashboard();
}

export function getDashboardStats(pages = getRuntimeState()?.pages || []) {
  return {
    totalPages: pages.length,
    doing: pages.filter((page) => page.status === "doing").length,
    review: pages.filter((page) => page.status === "review").length,
    activeReminders: pages.filter((page) => page.reminderAt && !page.reminderDone).length,
  };
}

export function getRecentPages(pages = getRuntimeState()?.pages || [], limit = 5) {
  return sortByUpdatedAt(pages).slice(0, limit);
}

export function getDueSoonReminders(pages = getRuntimeState()?.pages || [], limit = 5) {
  return pages
    .filter((page) => page.reminderAt && !page.reminderDone)
    .sort((a, b) => new Date(a.reminderAt) - new Date(b.reminderAt))
    .slice(0, limit);
}
