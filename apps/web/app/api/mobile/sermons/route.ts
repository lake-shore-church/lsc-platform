import { NextResponse } from "next/server";
import { getSermons } from "@repo/cms";

export async function GET() {
  const sermons = await getSermons().catch(() => []);
  return NextResponse.json({ sermons });
}
