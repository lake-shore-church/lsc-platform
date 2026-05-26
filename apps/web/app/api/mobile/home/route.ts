import { NextResponse } from "next/server";
import { getBlogPosts, getResources, getResolvedThisWeek, getSermons } from "@repo/cms";
import { getEvents } from "@repo/db";
import { serializeMobileBlogPost, serializeMobileSermon } from "@/lib/mobile-serialize";

export async function GET() {
  const [sermons, events, posts, resources, thisWeek] = await Promise.all([
    getSermons({ limit: 1 }).catch(() => []),
    getEvents({ upcomingFrom: new Date().toISOString(), limit: 3 }).catch(() => []),
    getBlogPosts({ limit: 2 }).catch(() => []),
    getResources({ publicOnly: true, limit: 1 }).catch(() => []),
    getResolvedThisWeek().catch(() => null),
  ]);

  const sermon = sermons[0] ? serializeMobileSermon(sermons[0]) : null;

  return NextResponse.json({
    sermon,
    events,
    posts: posts.map(serializeMobileBlogPost),
    book: resources[0] ?? null,
    this_week: thisWeek,
  });
}
