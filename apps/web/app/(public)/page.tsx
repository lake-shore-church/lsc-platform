import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getEvents } from "@repo/db";
import { getSermons, getSeriesList, getSiteConfig } from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SermonCard } from "@/components/sermons/SermonCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatDateTime } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Lake Shore Church — West Loop Chicago",
  description:
    "Join Lake Shore Church in Chicago's West Loop for worship, community, and gospel-centered ministry.",
};

export default async function HomePage() {
  const [config, seriesList, sermons, events] = await Promise.all([
    getSiteConfig().catch(() => null),
    getSeriesList().catch(() => []),
    getSermons({ limit: 1 }).catch(() => []),
    getEvents({ upcomingFrom: new Date().toISOString(), limit: 3 }).catch(() => []),
  ]);

  const churchName = config?.churchName ?? "Lake Shore Church";
  const currentSeries = seriesList[0];
  const latestSermon = sermons[0];
  const heroImage = currentSeries?.artwork
    ? urlFor(currentSeries.artwork).width(1200).height(600).url()
    : null;

  const churchJsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: churchName,
    url: SITE_URL,
    address: config?.address,
    telephone: config?.phone,
    email: config?.email,
  };

  return (
    <>
      <JsonLd data={churchJsonLd} />
      <section className="relative overflow-hidden bg-brand-primary text-white">
        <Container className="grid gap-8 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
              {config?.tagline ?? "West Loop · Chicago"}
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              {churchName}
            </h1>
            {currentSeries ? (
              <p className="mt-4 text-lg text-white/90">
                Current series: <strong>{currentSeries.title}</strong>
              </p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/live" className="!bg-white !text-brand-primary hover:!bg-surface">
                Watch Live
              </Button>
              <Button href="/visit" variant="secondary" className="!border-white/40 !text-white">
                Plan a Visit
              </Button>
              <Button href="/give" variant="ghost" className="!text-white hover:!bg-white/10">
                Give
              </Button>
            </div>
          </div>
          {heroImage ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image src={heroImage} alt="" fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 50vw" />
            </div>
          ) : null}
        </Container>
      </section>

      {config?.serviceTimes?.length ? (
        <section className="border-b border-default bg-surface py-6">
          <Container className="flex flex-wrap items-center justify-center gap-6 text-center text-sm sm:text-base">
            {config.serviceTimes.map((st, i) => (
              <div key={i}>
                <span className="font-semibold text-brand-primary">{st.day}</span>
                <span className="mx-2 text-foreground-muted">·</span>
                <span className="text-foreground-secondary">{st.time}</span>
                {st.note ? <span className="block text-xs text-foreground-muted">{st.note}</span> : null}
              </div>
            ))}
          </Container>
        </section>
      ) : null}

      <section className="py-12">
        <Container>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-brand-primary">Upcoming events</h2>
            <Link href="/events" className="text-sm font-semibold text-brand-accent hover:underline">
              View all
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="mt-6 text-foreground-muted">No upcoming events scheduled.</p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {events.map((ev) => (
                <li key={ev.id} className="rounded-xl border border-default bg-surface p-4">
                  <h3 className="font-semibold text-foreground-primary">{ev.title}</h3>
                  <p className="mt-1 text-sm text-foreground-secondary">
                    {formatDateTime(ev.starts_at)}
                  </p>
                  {ev.location ? (
                    <p className="text-sm text-foreground-muted">{ev.location}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {latestSermon ? (
        <section className="border-t border-default bg-surface py-12">
          <Container>
            <h2 className="text-2xl font-bold text-brand-primary">Latest sermon</h2>
            <div className="mt-6 max-w-md">
              <SermonCard sermon={latestSermon} />
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
