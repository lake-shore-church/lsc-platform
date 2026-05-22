import { NextResponse } from "next/server";
import { getSiteConfig } from "@repo/cms";

export async function GET() {
  const config = await getSiteConfig();
  return NextResponse.json({
    activeTheme: config.activeTheme ?? "bold",
    tagline: config.tagline,
    subTagline: config.subTagline,
    heroBody: config.heroBody,
    heroCtaText: config.heroCtaText,
    zeffyEmbedUrl: config.zeffyEmbedUrl?.trim() || null,
    paypalGivingEnabled: Boolean(config.paypalGivingEnabled),
    paypalGivingUrl: config.paypalGivingUrl?.trim() || null,
    churchTaxId: config.churchTaxId?.trim() || null,
    youtubeChannelId: config.youtubeChannelId?.trim() || null,
    liveStreamUrl: config.liveStreamUrl ?? null,
  });
}
