"use client";

import { useState } from "react";
import type { Event, Rsvp } from "@repo/db";
import { deleteEventAction } from "@/app/(staff)/staff/events/actions";

export function StaffEventsAdmin({
  events,
  rsvpsByEvent,
}: {
  events: Event[];
  rsvpsByEvent: Record<string, Rsvp[]>;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  async function sendReminder(eventId: string) {
    const res = await fetch("/api/send-reminder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event_id: eventId }),
    });
    const data = await res.json();
    alert(`Reminders sent: ${data.sent ?? 0} of ${data.total ?? 0}`);
  }

  return (
    <ul className="mt-8 space-y-4">
      {events.map((e) => (
        <li key={e.id} className="rounded-card border border-default bg-surface p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-lg">{e.title}</h2>
              <p className="text-sm text-foreground-muted">
                {new Date(e.starts_at).toLocaleString()}
                {e.location ? ` · ${e.location}` : ""}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="text-sm font-semibold text-brand-primary"
                onClick={() => setExpanded(expanded === e.id ? null : e.id)}
              >
                RSVPs ({rsvpsByEvent[e.id]?.length ?? 0})
              </button>
              <button
                type="button"
                className="text-sm font-semibold text-brand-secondary"
                onClick={() => sendReminder(e.id)}
              >
                Send reminder
              </button>
              <form action={deleteEventAction}>
                <input type="hidden" name="id" value={e.id} />
                <button
                  type="submit"
                  className="text-sm text-red-600"
                  onClick={(ev) => {
                    if (!confirm("Delete this event?")) ev.preventDefault();
                  }}
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
          {expanded === e.id ? (
            <ul className="mt-4 border-t border-default pt-3 text-sm">
              {(rsvpsByEvent[e.id] ?? []).map((r) => (
                <li key={r.id}>
                  {r.name} — {r.email}
                </li>
              ))}
              {(rsvpsByEvent[e.id] ?? []).length === 0 ? (
                <li className="text-foreground-muted">No RSVPs yet.</li>
              ) : null}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
