import { getSanityWriteClient } from "../client";
import { REAL_SITE_CONFIG } from "./realContent";

const SITE_CONFIG_ID = "siteConfig";

/** Next Sunday label in America/Chicago (for home page highlight). */
export function formatNextSundayLabel(from = new Date()): string {
  const d = new Date(from);
  const day = d.getDay();
  const daysUntil = day === 0 ? 0 : 7 - day;
  d.setDate(d.getDate() + daysUntil);
  const date = d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  });
  return `This Sunday · ${date} · 10:00 AM CT`;
}

/** Create or replace the siteConfig singleton in Sanity. */
export async function seedSiteConfig(): Promise<string> {
  const client = getSanityWriteClient();

  const zoomFromEnv =
    process.env.CHURCH_ZOOM_JOIN_URL?.trim() ||
    process.env.CHURCH_WEDNESDAY_ZOOM_URL?.trim();

  const zoomJoinUrl = zoomFromEnv || REAL_SITE_CONFIG.churchZoomJoinUrl;

  const doc = {
    ...REAL_SITE_CONFIG,
    _id: SITE_CONFIG_ID,
    churchZoomJoinUrl: zoomJoinUrl,
    wednesdayZoomLink: zoomJoinUrl,
    upcomingSermonDate: formatNextSundayLabel(),
  };

  const result = await client.createOrReplace(doc);
  return result._id;
}
