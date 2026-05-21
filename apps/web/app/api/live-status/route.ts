import { NextResponse } from "next/server";
import { buildLiveStatus, getSiteConfig } from "@repo/cms";

export const revalidate = 60;

export async function GET() {
  const config = await getSiteConfig();
  const host =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_URL ??
    "localhost:3000";
  const embedDomain = host.replace(/^https?:\/\//, "");
  const status = buildLiveStatus(config, { embedDomain });

  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
    },
  });
}
