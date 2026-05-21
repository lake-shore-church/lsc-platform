import { NextResponse } from "next/server";
import { getSermons } from "@repo/cms";
import { serializeMobileSermon } from "@/lib/mobile-serialize";

export async function GET() {
  const sermons = await getSermons().catch(() => []);
  return NextResponse.json({ sermons: sermons.map(serializeMobileSermon) });
}
