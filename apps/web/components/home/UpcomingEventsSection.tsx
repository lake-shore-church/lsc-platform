import Link from "next/link";
import type { Event } from "@repo/db";
import { Container } from "@/components/ui/Container";
import { formatDateTime } from "@/lib/format";

export function UpcomingEventsSection({ events }: { events: Event[] }) {
  const display = events.slice(0, 3);

  return (
    <section className="section-pad bg-background">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-label text-brand-accent">Upcoming events</h2>
          <Link href="/events" className="text-sm font-semibold text-brand-primary hover:underline">
            See all events →
          </Link>
        </div>
        {display.length === 0 ? (
          <p className="mt-6 text-foreground-muted">No upcoming events — check back soon.</p>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {display.map((ev) => (
              <li
                key={ev.id}
                className="flex flex-col rounded-card border border-default bg-surface p-6 shadow-card"
              >
                <h3 className="font-display text-lg font-semibold text-foreground-primary">
                  {ev.title}
                </h3>
                <p className="mt-2 text-sm text-foreground-secondary">
                  {formatDateTime(ev.starts_at)}
                </p>
                {ev.location ? (
                  <p className="text-sm text-foreground-muted">{ev.location}</p>
                ) : null}
                <Link
                  href="/events"
                  className="mt-auto pt-4 inline-flex min-h-[44px] items-center justify-center rounded-card border border-default bg-background px-4 text-sm font-semibold text-brand-primary hover:bg-surface-2"
                >
                  RSVP
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
