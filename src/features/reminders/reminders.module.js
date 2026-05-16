import { getState, saveState } from "../../state/store.js";
import { getTodayISO } from "../../utils/helpers.js";
import { renderReminders as renderRemindersView } from "./reminders.render.js";

export function renderReminders() {
  renderRemindersView({ pages: getState().pages || [] });
}

export function createReminder(pageId, reminderAt) {
  const page = findPage(pageId);
  if (!page) return null;

  page.reminderAt = reminderAt;
  page.reminderDone = false;
  page.updatedAt = getTodayISO();
  saveState();
  return page;
}

export function updateReminder(pageId, reminderAt) {
  if (reminderAt) {
    return createReminder(pageId, reminderAt);
  }

  return deleteReminder(pageId);
}

export function completeReminder(pageId) {
  const page = findPage(pageId);
  if (!page) return null;

  page.reminderDone = true;
  page.updatedAt = getTodayISO();
  saveState();
  return page;
}

export function deleteReminder(pageId) {
  const page = findPage(pageId);
  if (!page) return null;

  page.reminderAt = "";
  page.reminderDone = false;
  page.updatedAt = getTodayISO();
  saveState();
  return page;
}

export function getActiveReminders(pages = getState()?.pages || []) {
  return pages
    .filter((page) => page.reminderAt && !page.reminderDone)
    .sort((a, b) => new Date(a.reminderAt) - new Date(b.reminderAt));
}

function findPage(pageId) {
  return getState()?.pages?.find((page) => page.id === pageId) || null;
}
