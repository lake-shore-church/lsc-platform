const CHICAGO_TZ = "America/Chicago";

/** Calendar date YYYY-MM-DD in America/Chicago. */
export function toChicagoDateString(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CHICAGO_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const y = parts.find((p) => p.type === "year")?.value ?? "1970";
  const m = parts.find((p) => p.type === "month")?.value ?? "01";
  const d = parts.find((p) => p.type === "day")?.value ?? "01";
  return `${y}-${m}-${d}`;
}

function parseChicagoDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y!, m! - 1, d!, 12, 0, 0));
}

function chicagoWeekday(dateStr: string): number {
  return parseChicagoDate(dateStr).getUTCDay();
}

/** Most recent Sunday (in Chicago) on or before today. */
export function getMostRecentSundayDate(from = new Date()): string {
  let cursor = toChicagoDateString(from);
  for (let i = 0; i < 7; i++) {
    if (chicagoWeekday(cursor) === 0) return cursor;
    const prev = parseChicagoDate(cursor);
    prev.setUTCDate(prev.getUTCDate() - 1);
    cursor = toChicagoDateString(prev);
  }
  return cursor;
}

/** Next Sunday (in Chicago) on or after today (includes today if Sunday). */
export function getNextSundayDate(from = new Date()): string {
  const today = toChicagoDateString(from);
  let cursor = today;
  for (let i = 0; i < 14; i++) {
    if (chicagoWeekday(cursor) === 0) return cursor;
    const next = parseChicagoDate(cursor);
    next.setUTCDate(next.getUTCDate() + 1);
    cursor = toChicagoDateString(next);
  }
  return today;
}

/** Display label e.g. "This Sunday · May 31 · 10:00 A.M. CT" */
export function formatSundayLabel(
  sundayDate: string | undefined,
  sundayTime: string,
  from = new Date(),
): string {
  const target = sundayDate ?? getNextSundayDate(from);
  const d = parseChicagoDate(target);
  const date = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  return `This Sunday · ${date} · ${sundayTime.replace(/\s*CT\s*$/i, "").trim()} CT`;
}

export function formatShortDate(dateStr: string | undefined): string {
  if (!dateStr) return "";
  const d = parseChicagoDate(dateStr);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}
