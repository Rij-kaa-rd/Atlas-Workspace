import { columns } from "../../config/constants.js";
import { getState, saveState } from "../../state/store.js";
import { getTodayISO, groupBy } from "../../utils/helpers.js";
import { renderKanban as renderKanbanView } from "./kanban.render.js";

export function renderKanban() {
  renderKanbanView({ pages: getState().pages || [], columns });
}

export function updatePageStatus(pageId, targetStatus) {
  const page = getState().pages?.find((item) => item.id === pageId);
  if (!page) return null;

  page.status = targetStatus;
  page.updatedAt = getTodayISO();
  saveState();
  return page;
}

export function initKanbanDragAndDrop() {
  return null;
}

export function getKanbanColumns(pages = []) {
  const pagesByStatus = groupBy(pages, "status");
  return columns.map((column) => ({
    ...column,
    pages: pagesByStatus[column.id] || [],
  }));
}
