"use client";

import type { PrayerRequest } from "@repo/db";
import { updatePrayerStatus } from "@/app/(staff)/staff/prayers/actions";

const STATUSES = ["new", "assigned", "prayed"] as const;

export function PrayerTriageList({ prayers }: { prayers: PrayerRequest[] }) {
  if (prayers.length === 0) {
    return <p className="text-foreground-muted">No prayer requests yet.</p>;
  }

  return (
    <ul className="space-y-4">
      {prayers.map((prayer) => (
        <li
          key={prayer.id}
          className="rounded-card border border-default bg-surface p-5"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-foreground-muted">
                {new Date(prayer.created_at).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
                {prayer.is_private ? " · Private" : " · Public"}
              </p>
              <p className="mt-2 whitespace-pre-wrap text-foreground">{prayer.content}</p>
            </div>
            <form action={updatePrayerStatus} className="flex shrink-0 items-center gap-2">
              <input type="hidden" name="id" value={prayer.id} />
              <label htmlFor={`status-${prayer.id}`} className="sr-only">
                Status
              </label>
              <select
                id={`status-${prayer.id}`}
                name="status"
                defaultValue={prayer.status}
                className="min-h-[44px] rounded-md border border-default bg-background px-3 text-sm"
                onChange={(e) => e.currentTarget.form?.requestSubmit()}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
