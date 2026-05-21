import { NextResponse } from "next/server";
import { getSermonBySlug } from "@repo/cms";
import { serializeMobileSermon } from "@/lib/mobile-serialize";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const sermon = await getSermonBySlug(slug).catch(() => null);
  if (!sermon) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ sermon: serializeMobileSermon(sermon) });
}
