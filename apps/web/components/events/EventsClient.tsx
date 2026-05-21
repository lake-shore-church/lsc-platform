"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { Event } from "@repo/db";
import { formatDateTime } from "@/lib/format";
import { Button } from "@/components/ui/Button";

export function EventsClient({ events }: { events: Event[] }) {
  const t = useTranslations("events");
  const [view, setView] = useState<"list" | "calendar">("list");
  const [ministry, setMinistry] = useState("");
  const [rsvpEvent, setRsvpEvent] = useState<Event | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<string>("");

  const ministries = useMemo(
    () => [...new Set(events.map((e) => e.ministry_area).filter(Boolean))] as string[],
    [events],
  );

  const filtered = useMemo(() => {
    if (!ministry) return events;
    return events.filter((e) => e.ministry_area === ministry);
  }, [events, ministry]);

  async function submitRsvp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!rsvpEvent) return;
    setRsvpStatus("loading");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: rsvpEvent.id,
        name: fd.get("name"),
        email: fd.get("email"),
      }),
    });
    setRsvpStatus(res.ok ? "success" : "error");
    if (res.ok) setRsvpEvent(null);
  }

  function icalLink(ev: Event) {
    const start = new Date(ev.starts_at).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end = ev.ends_at
      ? new Date(ev.ends_at).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"
      : start;
    const text = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `DTSTART:${start}`,
      `DTEND:${end}`,
      `SUMMARY:${ev.title}`,
      `LOCATION:${ev.location ?? ""}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");
    return `data:text/calendar;charset=utf-8,${encodeURIComponent(text)}`;
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setView("list")}
          className={`min-h-[44px] rounded-lg px-4 ${view === "list" ? "bg-brand-primary text-white" : "bg-surface border border-default"}`}
        >
          {t("list")}
        </button>
        <button
          type="button"
          onClick={() => setView("calendar")}
          className={`min-h-[44px] rounded-lg px-4 ${view === "calendar" ? "bg-brand-primary text-white" : "bg-surface border border-default"}`}
        >
          {t("calendar")}
        </button>
        <select
          value={ministry}
          onChange={(e) => setMinistry(e.target.value)}
          className="min-h-[44px] rounded-lg border border-default bg-background px-3"
          aria-label={t("all_ministries")}
        >
          <option value="">{t("all_ministries")}</option>
          {ministries.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-foreground-muted">{t("no_events")}</p>
      ) : view === "calendar" ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ev) => (
            <div key={ev.id} className="rounded-lg border border-default bg-surface p-3 text-sm">
              <p className="font-semibold text-brand-primary">{formatDateTime(ev.starts_at)}</p>
              <p>{ev.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-4">
          {filtered.map((ev) => (
            <li key={ev.id} className="rounded-xl border border-default bg-surface p-5">
              <h2 className="text-lg font-semibold text-foreground-primary">{ev.title}</h2>
              <p className="text-sm text-foreground-secondary">{formatDateTime(ev.starts_at)}</p>
              {ev.location ? <p className="text-sm text-foreground-muted">{ev.location}</p> : null}
              {ev.description ? <p className="mt-2 text-sm">{ev.description}</p> : null}
              <div className="mt-4 flex flex-wrap gap-2">
                <Button onClick={() => setRsvpEvent(ev)}>{t("rsvp")}</Button>
                <a
                  href={icalLink(ev)}
                  download={`${ev.title}.ics`}
                  className="inline-flex min-h-[44px] items-center rounded-lg border border-default px-4 text-sm font-semibold text-brand-primary"
                >
                  {t("add_calendar")}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}

      {rsvpEvent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form onSubmit={submitRsvp} className="w-full max-w-md rounded-xl bg-background p-6 shadow-xl">
            <h3 className="text-lg font-bold">{t("rsvp_title", { title: rsvpEvent.title })}</h3>
            <input
              name="name"
              required
              placeholder={t("name")}
              className="mt-4 w-full min-h-[44px] rounded-lg border border-default px-3"
            />
            <input
              name="email"
              type="email"
              required
              placeholder={t("email")}
              className="mt-2 w-full min-h-[44px] rounded-lg border border-default px-3"
            />
            <div className="mt-4 flex gap-2">
              <Button type="submit" disabled={rsvpStatus === "loading"}>
                {t("confirm")}
              </Button>
              <Button type="button" variant="secondary" onClick={() => setRsvpEvent(null)}>
                {t("cancel")}
              </Button>
            </div>
            {rsvpStatus === "success" ? (
              <p className="mt-2 text-sm text-brand-accent">{t("confirmed")}</p>
            ) : null}
          </form>
        </div>
      ) : null}
    </div>
  );
}
