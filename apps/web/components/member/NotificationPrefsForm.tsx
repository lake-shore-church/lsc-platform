"use client";

import { useState } from "react";
import { saveNotificationPrefs } from "@/app/(member)/member/notifications/actions";

const FIELDS = [
  { key: "service_reminder" as const, label: "Sunday service reminder" },
  { key: "event_reminder" as const, label: "Event reminders" },
  { key: "new_sermon" as const, label: "New sermon published" },
  { key: "emergency" as const, label: "Emergency broadcasts" },
];

type Prefs = {
  service_reminder: boolean;
  event_reminder: boolean;
  new_sermon: boolean;
  emergency: boolean;
};

export function NotificationPrefsForm({
  userId,
  initial,
}: {
  userId: string;
  initial: Prefs;
}) {
  const [prefs, setPrefs] = useState(initial);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  async function toggle(key: keyof Prefs) {
    const next = { ...prefs, [key]: !prefs[key] };
    setPrefs(next);
    setLoading(true);
    setSaved(false);
    await saveNotificationPrefs(userId, next);
    setLoading(false);
    setSaved(true);
  }

  return (
    <ul className="mt-8 space-y-4">
      {FIELDS.map((f) => (
        <li
          key={f.key}
          className="flex min-h-[44px] items-center justify-between rounded-card border border-default bg-surface px-4 py-3"
        >
          <span className="font-medium text-foreground">{f.label}</span>
          <button
            type="button"
            role="switch"
            aria-checked={prefs[f.key]}
            disabled={loading}
            onClick={() => toggle(f.key)}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              prefs[f.key] ? "bg-brand-primary" : "bg-foreground-muted/40"
            }`}
          >
            <span
              className={`absolute top-0.5 size-6 rounded-full bg-white transition-transform ${
                prefs[f.key] ? "left-5" : "left-0.5"
              }`}
            />
          </button>
        </li>
      ))}
      {saved ? (
        <p className="text-sm text-brand-secondary">Preferences saved.</p>
      ) : null}
    </ul>
  );
}
