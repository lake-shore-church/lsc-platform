import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Event } from "@repo/db";
import { Container } from "@/components/ui/Container";
import { formatDateTime } from "@/lib/format";

export async function UpcomingEventsSection({ events }: { events: Event[] }) {
  const t = await getTranslations("home");
  const display = events.slice(0, 3);

  return (
    <section className="section-pad bg-background">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-h2 text-brand-primary">{t("upcoming_events")}</h2>
          <Link href="/events" className="link-hover text-base font-semibold text-brand-primary">
            {t("see_all_events")}
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
                <p className="mt-2 text-base text-foreground-secondary">
                  {formatDateTime(ev.starts_at)}
                </p>
                {ev.location ? (
                  <p className="mt-1 text-sm text-foreground-muted">{ev.location}</p>
                ) : null}
                <Link
                  href="/events"
                  className="link-hover mt-4 text-sm font-semibold text-brand-primary"
                >
                  RSVP →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
