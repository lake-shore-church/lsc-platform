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
  });
}
