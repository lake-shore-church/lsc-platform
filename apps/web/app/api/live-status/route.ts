import { NextResponse } from "next/server";
import {
  buildLiveStatus,
  endLiveInSanity,
  getSiteConfig,
  getSanityWriteClient,
  isWithinSundayLiveWindow,
} from "@repo/cms";

export const revalidate = 60;

export async function GET() {
  const canWrite =
    process.env.SANITY_API_TOKEN != null && process.env.SANITY_API_TOKEN !== "";
  const cms = canWrite ? getSanityWriteClient() : undefined;
  const config = await getSiteConfig(cms);

  // Auto-clear stale test/live flags after Sunday noon CT (or any day outside the window).
  if (config.isLiveNow && !isWithinSundayLiveWindow() && canWrite) {
    void endLiveInSanity().catch(() => {});
  }

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
