import type { Metadata } from "next";
import { getEvents } from "@repo/db";
import { getBlogPosts, getSermons, getSiteConfig } from "@repo/cms";
import { HeroSection } from "@/components/home/HeroSection";
import { LatestSermonSection } from "@/components/home/LatestSermonSection";
import { NewHereSection } from "@/components/home/NewHereSection";
import { MinistryCards } from "@/components/home/MinistryCards";
import { UpcomingEventsSection } from "@/components/home/UpcomingEventsSection";
import { BlogTeaser } from "@/components/home/BlogTeaser";

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

  return (
    <>
      <HeroSection />
      <LatestSermonSection sermon={sermons[0] ?? null} />
      <NewHereSection config={config} />
      <MinistryCards />
      <UpcomingEventsSection events={events} />
      {posts.length > 0 ? <BlogTeaser posts={posts} /> : null}
    </>
  );
}
