import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PrayerForm } from "@/components/forms/PrayerForm";

export const metadata: Metadata = {
  title: "Watch Live",
  description: "Join Lake Shore Church livestream and online worship.",
};

export default async function LivePage() {
  const config = await getSiteConfig();
  const liveChannelId = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  const embedSrc = liveChannelId
    ? `https://www.youtube.com/embed/live_stream?channel=${liveChannelId}`
    : "https://www.youtube.com/embed/jfKfPfyJRdk";

  return (
    <>
      <PageHeader title="Watch live" description="Join us online for worship." />
      <Container className="py-12">
        <span className="inline-flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white">
          <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
          Live
        </span>
        <div className="mt-6 aspect-video overflow-hidden rounded-xl border border-default bg-black">
          <iframe
            title="Live stream"
            src={embedSrc}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <section className="mt-12 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-xl font-bold text-brand-primary">Live prayer</h2>
            <p className="mt-2 text-sm text-foreground-secondary">
              Submit a prayer request during the service.
            </p>
            <div className="mt-4">
              <PrayerForm />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-brand-primary">Missed the service?</h2>
            <p className="mt-2 text-foreground-secondary">
              Watch recent messages on our{" "}
              <Link href="/sermons" className="font-semibold text-brand-primary hover:underline">
                sermons page
              </Link>
              .
            </p>
            <p className="mt-4 text-sm text-foreground-muted">
              {config.churchName}
            </p>
          </div>
        </section>
      </Container>
    </>
  );
}
