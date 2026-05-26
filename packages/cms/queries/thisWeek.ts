import { getSanityReadClient } from "../client";
import { getSiteConfig } from "../queries/pages";
import { resolveThisWeek } from "../lib/resolveThisWeek";
import { getNextSundayDate } from "../lib/thisWeekDates";
import type { ResolvedThisWeek, ThisWeek } from "../types";

const THIS_WEEK_QUERY = `*[
  _type == "thisWeek" &&
  is_published == true &&
  week_of <= $referenceDate
] | order(week_of desc)[0]{
  _id,
  week_of,
  sunday_date,
  sunday_time,
  sermon_title,
  sermon_scripture,
  sermon_description,
  venue_name,
  venue_address,
  venue_room,
  zoom_link,
  zoom_passcode,
  wednesday_date,
  wednesday_time,
  wednesday_topic,
  wednesday_zoom_link,
  wednesday_venue,
  sunday_school_topic,
  sunday_school_scripture,
  sunday_school_teacher,
  special_announcement,
  is_published
}`;

/** Latest published thisWeek for the current/upcoming worship week. */
export async function getPublishedThisWeek(
  referenceDate = getNextSundayDate(),
): Promise<ThisWeek | null> {
  return getSanityReadClient().fetch<ThisWeek | null>(THIS_WEEK_QUERY, {
    referenceDate,
  });
}

/** Resolved this week with siteConfig fallback. */
export async function getResolvedThisWeek(): Promise<ResolvedThisWeek> {
  const [doc, config] = await Promise.all([
    getPublishedThisWeek(),
    getSiteConfig(),
  ]);
  return resolveThisWeek(doc, config, process.env);
}
