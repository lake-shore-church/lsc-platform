import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getEvents } from "@repo/db";
import { getSermons, getSeriesList, getSiteConfig } from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SermonCard } from "@/components/sermons/SermonCard";
import { formatDateTime } from "@/lib/format";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Lake Shore Church — West Loop Chicago",
  description:
    "Lake Shore Church meets every Sunday at 10 AM in Chicago's West Loop. Join Pastor Brian for scripture-based teaching, community, and hope.",
};

export default async function HomePage() {
  const [config, seriesList, sermons, events] = await Promise.all([
    getSiteConfig(),
    getSeriesList().catch(() => []),
    getSermons({ limit: 1 }).catch(() => []),
    getEvents({ upcomingFrom: new Date().toISOString(), limit: 3 }).catch(() => []),
  ]);

  const currentSeries = seriesList[0];
  const latestSermon = sermons[0];
  const heroImage = currentSeries?.artwork
    ? urlFor(currentSeries.artwork).width(1200).height(600).url()
    : null;

  return (
    <>
      <section className="relative overflow-hidden bg-brand-primary text-white">
        <Container className="grid gap-8 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {config.tagline}
            </h1>
            {config.subTagline ? (
              <h2 className="mt-4 text-xl font-medium text-white/90 sm:text-2xl">
                {config.subTagline}
              </h2>
            ) : null}
            {config.heroBody ? (
              <p className="mt-6 text-lg text-white/85">{config.heroBody}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/visit" className="!bg-white !text-brand-primary hover:!bg-surface">
                Plan a Visit
              </Button>
              <Button href="/live" variant="secondary" className="!border-white/40 !text-white">
                Watch Live
              </Button>
              <Button href="/give" variant="ghost" className="!text-white hover:!bg-white/10">
                Give
              </Button>
            </div>
          </div>
          {heroImage ? (
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={heroImage}
                alt={currentSeries?.title ? `${currentSeries.title} series artwork` : ""}
                fill
                className="object-cover"
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          ) : null}
        </Container>
      </section>

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
