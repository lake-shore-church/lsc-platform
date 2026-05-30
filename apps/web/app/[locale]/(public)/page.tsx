import type { Metadata } from "next";
import { getEvents } from "@repo/db";
import {
  getBlogPosts,
  getHomeFeaturedMinistries,
  getResolvedThisWeek,
  getSermons,
  getSiteConfig,
} from "@repo/cms";
import { HeroSection } from "@/components/home/HeroSection";
import { ServiceInfoStrip } from "@/components/home/ServiceInfoStrip";
import { ChurchYearPromiseSection } from "@/components/home/ChurchYearPromiseSection";
import { WeeklyGatheringsSection } from "@/components/home/WeeklyGatheringsSection";
import { FeaturedSeriesSection } from "@/components/home/FeaturedSeriesSection";
import { NewHereSection } from "@/components/home/NewHereSection";
import { MinistryCards } from "@/components/home/MinistryCards";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { StayConnectedSection } from "@/components/home/StayConnectedSection";
import { FooterCtaBanner } from "@/components/home/FooterCtaBanner";
import { getFallbackMinistries } from "@/lib/ministriesFallback";

export const metadata: Metadata = {
  title: "Lake Shore Church — West Loop Chicago",
  description:
    "Lake Shore Church meets every Sunday at 10 AM in Chicago's West Loop. Join Pastor Brian for scripture-based teaching, community, and hope.",
};

export default async function HomePage() {
  const [config, thisWeek, sermons, events, posts, featuredMinistries] = await Promise.all([
    getSiteConfig(),
    getResolvedThisWeek(),
    getSermons({ limit: 1 }).catch(() => []),
    getEvents({ upcomingFrom: new Date().toISOString(), limit: 3 }).catch(() => []),
    getBlogPosts({ limit: 2 }).catch(() => []),
    getHomeFeaturedMinistries().catch(() => []),
  ]);

  const latestSermon = sermons[0] ?? null;
  const homeMinistries = featuredMinistries.length
    ? featuredMinistries
    : getFallbackMinistries().filter((m) => m.showOnHome);

  return (
    <>
      <HeroSection
        tagline={config.tagline}
        subTagline={config.subTagline}
        heroBody={config.heroBody}
        heroCtaText={config.heroCtaText}
      />
      <ServiceInfoStrip />
      <ChurchYearPromiseSection config={config} />
      <WeeklyGatheringsSection
        config={config}
        thisWeek={thisWeek}
        featured={homeMinistries}
        latestSermon={latestSermon}
      />
      <FeaturedSeriesSection latestSermon={latestSermon} />
      <NewHereSection />
      <MinistryCards />
      <UpcomingEventsSection events={events} />
      <TestimonialsSection />
      <StayConnectedSection posts={posts} />
      <FooterCtaBanner />
    </>
  );
}
