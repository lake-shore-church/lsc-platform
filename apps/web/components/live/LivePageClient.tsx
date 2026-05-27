"use client";

import { Link } from "@/i18n/navigation";
import type { LiveStatusResponse, Sermon } from "@repo/cms";
import { LiveCountdown } from "@repo/ui/web/LiveCountdown";
import { PrayerForm } from "@/components/forms/PrayerForm";
import { SermonCard } from "@/components/sermons/SermonCard";
import { useLiveStatus } from "@/hooks/useLiveStatus";

type Props = {
  initial: LiveStatusResponse;
  recentSermons: Sermon[];
  seriesImageUrl?: string | null;
};

const PLATFORM_CARDS = [
  {
    icon: "🌐",
    title: "Watch here",
    subtitle: "Lake Shore Church website — our primary home for live worship",
    href: null as string | null,
    badge: "You're here ✓",
  },
  {
    icon: "📖",
    title: "Sermon archive",
    subtitle: "Watch last Sunday and recent messages anytime",
    href: "/sermons",
    badge: null,
    internal: true,
  },
  {
    icon: "📺",
    title: "YouTube",
    subtitle: "Optional — we'll simulcast here when in-house live is enabled",
    href: "https://www.youtube.com/@lakeshorechurch",
    badge: null,
  },
  {
    icon: "👥",
    title: "Facebook",
    subtitle: "Community updates and optional live simulcast",
    href: "https://www.facebook.com/lschurchchicago",
    badge: null,
  },
] as const;

function LivePlayerOverlay({ status }: { status: LiveStatusResponse }) {
  return (
    <>
      <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold uppercase text-white shadow-lg">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>
        Live
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-12">
        <p className="font-semibold text-white">
          {status.churchName} · Sunday Service
        </p>
        <p className="text-sm text-white/85">{status.locationLabel}</p>
      </div>
    </>
  );
}

export function LivePageClient({
  initial,
  recentSermons,
  seriesImageUrl,
}: Props) {
  const { status: polled } = useLiveStatus();
  const status = polled ?? initial;
  const isLive = status.isLive && status.embedUrl;

  if (isLive) {
    return (
      <div className="space-y-12">
        <section>
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-default bg-black">
                <iframe
                  title="Live stream"
                  src={status.embedUrl!}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <LivePlayerOverlay status={status} />
              </div>
              <div className="rounded-xl border border-default bg-surface p-4">
                <h2 className="text-lg font-bold text-brand-primary">
                  Submit a prayer during service
                </h2>
                <p className="mt-1 text-sm text-foreground-secondary">
                  Your request goes to our prayer team right away.
                </p>
                <div className="mt-4">
                  <PrayerForm
                    labels={{
                      public: "Share with prayer team",
                      private: "Keep private",
                      nameOptional: "Name (optional)",
                      share: "Prayer request",
                      submit: "Send prayer",
                      success: "Thank you — we're praying with you.",
                    }}
                  />
                </div>
              </div>
            </div>
            {status.chatEmbedUrl ? (
              <div className="flex min-h-[480px] flex-col gap-4">
                <h2 className="text-lg font-bold text-brand-primary">Live chat</h2>
                <iframe
                  title="YouTube live chat"
                  src={status.chatEmbedUrl}
                  className="min-h-[400px] flex-1 rounded-xl border border-default bg-surface"
                />
              </div>
            ) : null}
          </div>
        </section>

        <WatchEverywhere status={status} />
        <RecentServices sermons={recentSermons} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: seriesImageUrl
              ? `url(${seriesImageUrl})`
              : "linear-gradient(135deg, #1B4F8A 0%, #0d2847 100%)",
          }}
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative px-6 py-16 text-center sm:py-20">
          <LiveCountdown targetIso={status.nextServiceAt} />
          <p className="mt-6 text-lg text-white">
            Join us live every Sunday at 10:00 AM CT
          </p>
          <p className="mt-2 text-sm text-white/80">
            Merit School of Music · West Loop Chicago
          </p>
          <p className="mx-auto mt-4 max-w-lg text-sm text-white/75">
            We are upgrading this page so Sunday video plays here on our site
            (like our previous in-house stream). Until then, watch recent messages
            below or join us in person.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center rounded-md bg-brand-accent px-6 font-semibold text-white"
            >
              Set reminder
            </Link>
            <Link
              href={
                recentSermons[0]
                  ? `/sermons/${recentSermons[0].slug.current}`
                  : "/sermons"
              }
              className="inline-flex min-h-[44px] items-center rounded-md border border-white/40 px-6 font-semibold text-white hover:bg-white/10"
            >
              Watch last Sunday
            </Link>
          </div>
        </div>
      </section>

      <WatchEverywhere status={status} />
      <RecentServices sermons={recentSermons} />
    </div>
  );
}

function WatchEverywhere({ status }: { status: LiveStatusResponse }) {
  return (
    <section>
      <h2 className="font-display text-h3 text-brand-primary">
        Watch Lake Shore Church everywhere
      </h2>
      <p className="mt-2 text-foreground-secondary">
        Join us on your favourite platform
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PLATFORM_CARDS.map((card) => {
          const href =
            card.title === "YouTube"
              ? status.youtubeUrl
              : card.title === "Facebook"
                ? status.facebookUrl
                : card.href;
          const inner = (
            <div className="rounded-card border border-default bg-surface p-5 transition-shadow hover:shadow-card">
              <span className="text-2xl" aria-hidden>
                {card.icon}
              </span>
              <h3 className="mt-3 font-semibold text-brand-primary">{card.title}</h3>
              <p className="mt-1 text-sm text-foreground-secondary">{card.subtitle}</p>
              {card.badge ? (
                <span className="mt-3 inline-block rounded-full bg-brand-primary/10 px-2 py-0.5 text-xs font-semibold text-brand-primary">
                  {card.badge}
                </span>
              ) : null}
            </div>
          );
          if (!href) return <div key={card.title}>{inner}</div>;
          if ("internal" in card && card.internal) {
            return (
              <Link key={card.title} href={href} className="block">
                {inner}
              </Link>
            );
          }
          return (
            <a
              key={card.title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {inner}
            </a>
          );
        })}
      </div>
    </section>
  );
}

function RecentServices({ sermons }: { sermons: Sermon[] }) {
  if (!sermons.length) return null;
  return (
    <section>
      <h2 className="font-display text-h3 text-brand-primary">Recent services</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sermons.map((s) => (
          <SermonCard key={s._id} sermon={s} />
        ))}
      </div>
      <Link
        href="/sermons"
        className="mt-6 inline-block font-semibold text-brand-primary hover:underline"
      >
        View all sermons →
      </Link>
    </section>
  );
}
