import type { SiteConfig, ThisWeek, ResolvedThisWeek } from "../types";
import { resolveChurchZoomJoinUrl } from "./churchZoom";
import { formatSundayLabel, getMostRecentSundayDate } from "./thisWeekDates";

/** Normalize thisWeek + siteConfig into one shape for web/mobile/API. */
export function resolveThisWeek(
  doc: ThisWeek | null | undefined,
  config: SiteConfig,
  env: NodeJS.ProcessEnv = process.env,
): ResolvedThisWeek {
  if (doc?.is_published) {
    const sundayTime = doc.sunday_time?.trim() || "10:00 A.M. CT";
    return {
      source: "thisWeek",
      week_of: doc.week_of,
      sunday_date: doc.sunday_date ?? doc.week_of,
      sunday_time: sundayTime,
      sermon_title: doc.sermon_title?.trim() || "",
      sermon_scripture: doc.sermon_scripture?.trim(),
      sermon_description: doc.sermon_description?.trim(),
      venue_name: doc.venue_name?.trim() || "Merit School of Music",
      venue_address: doc.venue_address?.trim(),
      venue_room: doc.venue_room?.trim(),
      zoom_link:
        doc.zoom_link?.trim() ||
        doc.wednesday_zoom_link?.trim() ||
        resolveChurchZoomJoinUrl(config, env),
      zoom_passcode: doc.zoom_passcode?.trim() || config.churchZoomPasscode,
      wednesday_date: doc.wednesday_date,
      wednesday_time: doc.wednesday_time?.trim() || "7:00 PM CT",
      wednesday_topic: doc.wednesday_topic?.trim(),
      wednesday_zoom_link: doc.wednesday_zoom_link?.trim(),
      wednesday_venue: doc.wednesday_venue?.trim(),
      sunday_school_topic: doc.sunday_school_topic?.trim(),
      sunday_school_scripture: doc.sunday_school_scripture?.trim(),
      sunday_school_teacher: doc.sunday_school_teacher?.trim(),
      special_announcement: doc.special_announcement?.trim(),
      sunday_date_label: formatSundayLabel(
        doc.sunday_date ?? doc.week_of,
        sundayTime,
      ),
    };
  }

  const sundayTime = "10:00 A.M. CT";
  const venueName = config.addressLine1?.trim() || "Merit School of Music";
  const venueAddress = [config.addressLine2, config.cityStateZip]
    .filter(Boolean)
    .join(", ")
    .trim();

  return {
    source: "siteConfig",
    sunday_time: sundayTime,
    sermon_title: config.upcomingSermonTitle?.trim() || "",
    sermon_description: config.upcomingSermonDescription?.trim(),
    venue_name: venueName,
    venue_address: venueAddress || config.addressLine2,
    venue_room: undefined,
    zoom_link: resolveChurchZoomJoinUrl(config, env),
    zoom_passcode: config.churchZoomPasscode,
    wednesday_time: "7:00 PM CT",
    wednesday_topic: config.wednesdayPrayerTitle?.trim(),
    sunday_date_label:
      config.upcomingSermonDate?.trim() ||
      formatSundayLabel(getMostRecentSundayDate(), sundayTime),
  };
}
