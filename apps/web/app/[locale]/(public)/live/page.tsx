import type { Metadata } from "next";
import { buildLiveStatus, getSermons, getSeriesList, getSiteConfig } from "@repo/cms";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { LivePageClient } from "@/components/live/LivePageClient";
import { urlFor } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Watch Live",
  description: "Join Lake Shore Church livestream and online worship.",
};

export default async function LivePage() {
  const config = await getSiteConfig();
  const host =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const embedDomain = host.replace(/^https?:\/\//, "");
  const initial = buildLiveStatus(config, { embedDomain });

  const [recentSermons, seriesList] = await Promise.all([
    getSermons({ limit: 3 }).catch(() => []),
    getSeriesList().catch(() => []),
  ]);

  const featuredSeries = seriesList[0];
  const seriesImageUrl = featuredSeries?.artwork
    ? urlFor(featuredSeries.artwork).width(1200).height(675).url()
    : null;

  return (
    <>
      <PageHeader
        title="Watch live"
        description="Sunday worship at 10:00 AM CT — live video on this page and in the mobile app when we are streaming. Sermon replays and prayer are always available."
      />
      <Container className="py-12">
        <LivePageClient
          initial={initial}
          recentSermons={recentSermons}
          seriesImageUrl={seriesImageUrl}
        />
      </Container>
    </>
  );
}
