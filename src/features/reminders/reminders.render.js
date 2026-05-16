import { formatDate, sanitizeText } from "../../utils/helpers.js";

const $ = (id) => document.getElementById(id);

export function renderReminders({ pages }) {
  const reminders = pages.filter((page) => page.reminderAt);

  if ($("reminderMeta")) {
    $("reminderMeta").textContent = reminders.length
      ? `${reminders.length} reminder`
      : "Tidak ada reminder";
  }

  if (!$("reminderList")) return;

  $("reminderList").innerHTML = reminders.length
    ? reminders
        .map(
          (page) => `
            <article class="reminder-item">
              <strong>${sanitizeText(page.title)}</strong>
              <span>${formatDate(page.reminderAt)}</span>
            </article>
          `,
        )
        .join("")
    : `<p class="empty-state">Belum ada reminder.</p>`;
}
