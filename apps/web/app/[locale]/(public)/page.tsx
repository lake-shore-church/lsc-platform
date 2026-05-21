import type { Metadata } from "next";
import { getEvents } from "@repo/db";
import { getBlogPosts, getSermons, getSiteConfig } from "@repo/cms";
import { HeroSection } from "@/components/home/HeroSection";
import { ServiceInfoStrip } from "@/components/home/ServiceInfoStrip";
import { FeaturedSeriesSection } from "@/components/home/FeaturedSeriesSection";
import { NewHereSection } from "@/components/home/NewHereSection";
import { MinistryCards } from "@/components/home/MinistryCards";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { StayConnectedSection } from "@/components/home/StayConnectedSection";
import { FooterCtaBanner } from "@/components/home/FooterCtaBanner";

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
      <HeroSection
        tagline={config.tagline}
        subTagline={config.subTagline}
        heroBody={config.heroBody}
        heroCtaText={config.heroCtaText}
      />
      <ServiceInfoStrip />
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
