import { renderMarkdown, sanitizeText, stringifyTags } from "../../utils/helpers.js";

const $ = (id) => document.getElementById(id);

export function renderEditor({ page }) {
  if (!page) {
    if ($("titleInput")) $("titleInput").value = "";
    if ($("iconInput")) $("iconInput").value = "";
    if ($("tagsInput")) $("tagsInput").value = "";
    if ($("statusSelect")) $("statusSelect").value = "ideas";
    if ($("reminderInput")) $("reminderInput").value = "";
    if ($("markdownInput")) $("markdownInput").value = "";
    if ($("markdownPreview")) $("markdownPreview").innerHTML = "";
    if ($("previewTags")) $("previewTags").innerHTML = "";
    return;
  }

  if ($("titleInput")) $("titleInput").value = page.title || "";
  if ($("iconInput")) $("iconInput").value = page.icon || "";
  if ($("tagsInput")) $("tagsInput").value = stringifyTags(page.tags || []);
  if ($("statusSelect")) $("statusSelect").value = page.status || "ideas";
  if ($("reminderInput")) $("reminderInput").value = page.reminderAt || "";
  if ($("markdownInput")) $("markdownInput").value = page.markdown || "";
  if ($("markdownPreview")) $("markdownPreview").innerHTML = renderMarkdown(page.markdown || "");
  if ($("previewTags")) {
    $("previewTags").innerHTML = (page.tags || [])
      .map((tag) => `<span class="chip">#${sanitizeText(tag)}</span>`)
      .join("");
  }
}
