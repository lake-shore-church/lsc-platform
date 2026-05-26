import { NextResponse } from "next/server";
import { getSiteConfig, resolveChurchZoomJoinUrl } from "@repo/cms";

/**
 * Church-owned one-click Zoom join (replaces Subsplash short links).
 * Same redirect for Sunday, Wednesday, and all meetings.
 */
export async function GET() {
  const config = await getSiteConfig();
  const target = resolveChurchZoomJoinUrl(config, process.env);
  return NextResponse.redirect(target, { status: 302 });
}
