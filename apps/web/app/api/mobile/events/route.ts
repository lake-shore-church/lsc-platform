import { NextResponse } from "next/server";
import { getEvents } from "@repo/db";

export async function GET() {
  const events = await getEvents({
    upcomingFrom: new Date().toISOString(),
    limit: 30,
  }).catch(() => []);

  return NextResponse.json({ events });
}
