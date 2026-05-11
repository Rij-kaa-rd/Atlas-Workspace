import {
  completeReminder as completeRuntimeReminder,
  getRuntimeState,
  renderReminders as renderRuntimeReminders,
  updatePage as updateRuntimePage,
  updateReminder as updateRuntimeReminder,
} from "../../app.runtime.js";
import { getTodayISO } from "../../utils/helpers.js";

export function renderReminders() {
  renderRuntimeReminders();
}

export function createReminder(pageId, reminderAt) {
  const page = findPage(pageId);
  if (!page) return null;
  page.reminderAt = reminderAt;
  page.reminderDone = false;
  page.updatedAt = getTodayISO();
  updateRuntimePage({ reminderAt, reminderDone: false });
  return page;
}

export function updateReminder(pageId, reminderAt) {
  if (reminderAt) {
    return createReminder(pageId, reminderAt);
  }
  return updateRuntimeReminder(pageId);
}

export function completeReminder(pageId) {
  return completeRuntimeReminder(pageId);
}

export function deleteReminder(pageId) {
  const page = findPage(pageId);
  if (!page) return null;
  page.reminderAt = "";
  page.reminderDone = false;
  page.updatedAt = getTodayISO();
  updateRuntimePage({ reminderAt: "", reminderDone: false });
  return page;
}

export function getActiveReminders(pages = getRuntimeState()?.pages || []) {
  return pages
    .filter((page) => page.reminderAt && !page.reminderDone)
    .sort((a, b) => new Date(a.reminderAt) - new Date(b.reminderAt));
}

function findPage(pageId) {
  return getRuntimeState()?.pages?.find((page) => page.id === pageId) || null;
}
