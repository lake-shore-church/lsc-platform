import type { Metadata } from "next";
import { getEvents } from "@repo/db";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { EventsClient } from "@/components/events/EventsClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and gatherings at Lake Shore Church.",
};

export default async function EventsPage() {
  const events = await getEvents({
    upcomingFrom: new Date().toISOString(),
  }).catch(() => []);

  const eventsJsonLd = events.map((ev) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.title,
    startDate: ev.starts_at,
    endDate: ev.ends_at,
    location: ev.location,
    url: `${SITE_URL}/events`,
  }));

  return (
    <>
      {eventsJsonLd.length ? <JsonLd data={eventsJsonLd} /> : null}
      <PageHeader title="Events" description="Connect, serve, and grow together." />
      <Container className="py-12">
        <EventsClient events={events} />
      </Container>
    </>
  );
}
