import {
  createPage as createRuntimePage,
  deletePage as deleteRuntimePage,
  duplicatePage as duplicateRuntimePage,
  filterPages as filterRuntimePages,
  getRuntimeState,
  renderNotes as renderRuntimeNotes,
  selectPage as selectRuntimePage,
  updatePage as updateRuntimePage,
} from "../../app.runtime.js";

export function renderNotes() {
  renderRuntimeNotes();
}

export function createPage(pageInput) {
  return createRuntimePage(pageInput);
}

export function updatePage(patch) {
  return updateRuntimePage(patch);
}

export function deletePage() {
  return deleteRuntimePage();
}

export function duplicatePage() {
  return duplicateRuntimePage();
}

export function selectPage(pageId) {
  const state = getRuntimeState();
  if (pageId && state?.pages?.some((page) => page.id === pageId)) {
    state.selectedPageId = pageId;
  }
  return selectRuntimePage();
}

export function filterPages() {
  return filterRuntimePages();
}
