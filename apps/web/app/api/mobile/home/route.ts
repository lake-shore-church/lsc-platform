import { NextResponse } from "next/server";
import { getBlogPosts, getResources, getSermons } from "@repo/cms";
import { getEvents } from "@repo/db";

export async function GET() {
  const [sermons, events, posts, resources] = await Promise.all([
    getSermons({ limit: 1 }).catch(() => []),
    getEvents({ upcomingFrom: new Date().toISOString(), limit: 2 }).catch(() => []),
    getBlogPosts({ limit: 3 }).catch(() => []),
    getResources({ publicOnly: true, limit: 1 }).catch(() => []),
  ]);

  return NextResponse.json({
    sermon: sermons[0] ?? null,
    events,
    posts,
    book: resources[0] ?? null,
  });
}
