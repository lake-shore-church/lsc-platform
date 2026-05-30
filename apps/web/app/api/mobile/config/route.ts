import { NextResponse } from "next/server";
import {
  getSiteConfig,
  getResolvedThisWeek,
  resolveChurchZoomJoinUrl,
  resolveChurchZoomMeetingId,
  resolveChurchZoomPasscode,
  churchZoomJoinPath,
} from "@repo/cms";

export async function GET() {
  const [config, thisWeek] = await Promise.all([
    getSiteConfig(),
    getResolvedThisWeek().catch(() => null),
  ]);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";

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
    zoomJoinUrl: resolveChurchZoomJoinUrl(config, process.env),
    zoomJoinPath: churchZoomJoinPath(),
    zoomJoinRedirectUrl: appUrl ? `${appUrl}${churchZoomJoinPath()}` : null,
    zoomMeetingId: resolveChurchZoomMeetingId(config),
    zoomPasscode: resolveChurchZoomPasscode(config),
    this_week: thisWeek,
  });
}
