import { getTranslations } from "next-intl/server";
import type { Event } from "@repo/db";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";
import { formatDateTime } from "@/lib/format";

export async function UpcomingEventsSection({ events }: { events: Event[] }) {
  const t = await getTranslations("home");
  const display = events.slice(0, 3);

  return (
    <section className="section-pad bg-background">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-h2 text-brand-primary">{t("upcoming_events")}</h2>
          <Link href="/events" className="text-base font-semibold text-brand-primary hover:underline">
            {t("see_all_events")}
          </Link>
        </div>
        {display.length === 0 ? (
          <p className="mt-6 text-base text-foreground-secondary">{t("no_upcoming_events")}</p>
        ) : (
          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {display.map((ev) => (
              <li
                key={ev.id}
                className="flex flex-col rounded-card border border-default bg-surface p-6 shadow-card"
              >
                <Link href={`/events?event=${ev.id}`} className="group block">
                  <h3 className="font-display text-lg font-semibold text-foreground-primary group-hover:text-brand-primary">
                    {ev.title}
                  </h3>
                  <p className="mt-2 text-base text-foreground-secondary">
                    {formatDateTime(ev.starts_at)}
                  </p>
                  {ev.location ? (
                    <p className="mt-1 text-sm text-foreground-muted">{ev.location}</p>
                  ) : null}
                </Link>
                <Link
                  href={`/events?event=${ev.id}`}
                  className="mt-4 text-sm font-semibold text-brand-primary hover:underline"
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
