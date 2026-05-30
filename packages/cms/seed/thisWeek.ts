import { getNextSundayDate } from "../lib/thisWeekDates";
import { getSanityWriteClient } from "../client";
import { getSiteConfig } from "../queries/pages";
import { resolveChurchZoomJoinUrl } from "../lib/churchZoom";

/** Seed one published thisWeek document for the upcoming Sunday. */
export async function seedThisWeekDocument(): Promise<string> {
  const client = getSanityWriteClient();
  const config = await getSiteConfig().catch(() => null);
  const weekOf = getNextSundayDate();
  const zoom =
    config?.churchZoomJoinUrl?.trim() ||
    resolveChurchZoomJoinUrl(config ?? {}, process.env);

  const doc = {
    _type: "thisWeek" as const,
    _id: `thisWeek-${weekOf}`,
    week_of: weekOf,
    sunday_date: weekOf,
    sunday_time: "10:00 A.M. CT",
    sermon_title:
      config?.upcomingSermonTitle?.trim() ||
      "Four Key Ways Jesus Prepares Us to Do His Work",
    sermon_scripture: "Luke 24:36–53",
    sermon_description: config?.upcomingSermonDescription?.trim(),
    venue_name: "Merit School of Music",
    venue_address: config?.addressLine2?.trim() || "38 S. Peoria St",
    venue_room: "2nd floor, room 210",
    zoom_link: zoom,
    zoom_passcode: config?.churchZoomPasscode?.trim() || "662215",
    wednesday_time: "7:00 PM CT",
    wednesday_topic:
      config?.wednesdayPrayerTitle?.trim() || "Wednesday prayer & fellowship",
    wednesday_zoom_link: zoom,
    is_published: true,
  };

  const result = await client.createOrReplace(doc);
  return result._id;
}
