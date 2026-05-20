"use client";

import type { PrayerRequest } from "@repo/db";
import {
  assignPrayerToMe,
  updatePrayerStatus,
} from "@/app/(staff)/staff/prayers/actions";

const COLUMNS: { key: PrayerRequest["status"]; title: string }[] = [
  { key: "new", title: "New" },
  { key: "assigned", title: "Assigned" },
  { key: "prayed", title: "Prayed" },
];

export function PrayerKanban({ prayers }: { prayers: PrayerRequest[] }) {
  return (
    <div className="mt-8 grid gap-4 lg:grid-cols-3">
      {COLUMNS.map((col) => {
        const items = prayers.filter((p) => p.status === col.key);
        return (
          <section
            key={col.key}
            className="rounded-card border border-default bg-surface-2/50 p-4"
          >
            <h2 className="font-display text-h3 text-foreground">
              {col.title}{" "}
              <span className="text-sm font-normal text-foreground-muted">
                ({items.length})
              </span>
            </h2>
            <ul className="mt-4 space-y-3">
              {items.map((prayer) => (
                <li
                  key={prayer.id}
                  className="rounded-md border border-default bg-surface p-4"
                >
                  <p className="text-xs text-foreground-muted">
                    {new Date(prayer.created_at).toLocaleDateString()}
                    {prayer.is_private ? " · Private" : " · Public"}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap text-sm text-foreground">
                    {prayer.content}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {col.key === "new" ? (
                      <form action={assignPrayerToMe}>
                        <input type="hidden" name="id" value={prayer.id} />
                        <button
                          type="submit"
                          className="text-sm font-semibold text-brand-primary"
                        >
                          Assign to me
                        </button>
                      </form>
                    ) : null}
                    <form action={updatePrayerStatus} className="flex items-center gap-1">
                      <input type="hidden" name="id" value={prayer.id} />
                      <select
                        name="status"
                        defaultValue={prayer.status}
                        className="rounded border border-default bg-background px-2 py-1 text-xs"
                        onChange={(e) => e.currentTarget.form?.requestSubmit()}
                      >
                        {COLUMNS.map((c) => (
                          <option key={c.key} value={c.key}>
                            {c.title}
                          </option>
                        ))}
                      </select>
                    </form>
                    {prayer.submitter_id ? (
                      <a
                        href={`mailto:?subject=Prayer%20follow-up&body=${encodeURIComponent(prayer.content)}`}
                        className="text-sm text-brand-secondary"
                      >
                        Reply
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
