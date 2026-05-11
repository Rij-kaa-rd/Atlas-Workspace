import {
  initKanbanDragAndDrop as initRuntimeKanbanDragAndDrop,
  renderKanban as renderRuntimeKanban,
  updatePageStatus as updateRuntimePageStatus,
} from "../../app.runtime.js";
import { groupBy } from "../../utils/helpers.js";

const columns = [
  { id: "ideas", title: "Ideas", color: "#315f95" },
  { id: "doing", title: "Doing", color: "#14715f" },
  { id: "review", title: "Review", color: "#c65f45" },
  { id: "done", title: "Done", color: "#677076" },
];

export function renderKanban() {
  renderRuntimeKanban();
}

export function updatePageStatus(pageId, targetStatus, beforeId = "") {
  return updateRuntimePageStatus(pageId, targetStatus, beforeId);
}

export function initKanbanDragAndDrop() {
  initRuntimeKanbanDragAndDrop();
}

export function getKanbanColumns(pages = []) {
  const pagesByStatus = groupBy(pages, "status");
  return columns.map((column) => ({
    ...column,
    pages: pagesByStatus[column.id] || [],
  }));
}
