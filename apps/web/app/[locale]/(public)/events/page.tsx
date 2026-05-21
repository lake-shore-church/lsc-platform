import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getEvents } from "@repo/db";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { EventsClient } from "@/components/events/EventsClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("events");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function EventsPage() {
  const t = await getTranslations("events");
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
      <PageHeader title={t("page_title")} description={t("page_desc")} />
      <Container className="py-12">
        <EventsClient events={events} />
      </Container>
    </>
  );
}
