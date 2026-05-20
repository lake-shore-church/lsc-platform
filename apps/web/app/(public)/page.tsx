import type { Metadata } from "next";
import { getEvents } from "@repo/db";
import { getBlogPosts, getSermons, getSiteConfig } from "@repo/cms";
import { HeroSection } from "@/components/home/HeroSection";
import { QuickInfoStrip } from "@/components/home/QuickInfoStrip";
import { LatestSermonSection } from "@/components/home/LatestSermonSection";
import { NewHereSection } from "@/components/home/NewHereSection";
import { MinistryCards } from "@/components/home/MinistryCards";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { BlogTeaser } from "@/components/home/BlogTeaser";
import { FooterCta } from "@/components/home/FooterCta";

export const metadata: Metadata = {
  title: "Lake Shore Church — West Loop Chicago",
  description:
    "Lake Shore Church meets every Sunday at 10 AM in Chicago's West Loop. Join Pastor Brian for scripture-based teaching, community, and hope.",
};

export default async function HomePage() {
  const [config, sermons, events, posts] = await Promise.all([
    getSiteConfig(),
    getSermons({ limit: 1 }).catch(() => []),
    getEvents({ upcomingFrom: new Date().toISOString(), limit: 3 }).catch(() => []),
    getBlogPosts({ limit: 2 }).catch(() => []),
  ]);

  const latestSermon = sermons[0] ?? null;

  return (
    <>
      <HeroSection />
      <QuickInfoStrip config={config} />
      <LatestSermonSection sermon={latestSermon} />
      <NewHereSection />
      <MinistryCards />
      <UpcomingEventsSection events={events} />
      <BlogTeaser posts={posts} />
      <FooterCta />
    </>
  );
}
