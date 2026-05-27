/**
 * Pastor weekly email → siteConfig fields.
 * Source: email "Weekly Update for Tuesday, May 26, 2026"
 */
export type WeeklySiteConfigPatch = {
  upcomingSermonTitle: string;
  upcomingSermonDescription: string;
  upcomingSermonDate: string;
  wednesdayPrayerTitle: string;
  wednesdayPrayerSummary: string;
  sundayPrayerGathering: string;
  churchZoomJoinUrl: string;
  wednesdayZoomLink: string;
  churchZoomMeetingId: string;
  churchZoomPasscode: string;
};

/** Week of Sunday May 31, 2026 (email dated Tue May 26). */
export const WEEK_2026_05_31: WeeklySiteConfigPatch = {
  upcomingSermonTitle: "How Satan Influences the World",
  upcomingSermonDescription:
    "Pastor Brian resumes this series. Key text: “We know that we are from God, and the whole world lies in the power of the evil one.” (1 John 5:19 ESV). After worship: providence lunch together — celebrating Ruth’s return, Eunice’s and Ishaku’s graduations, and summertime.",
  upcomingSermonDate: "This Sunday · May 31 · 10:00 A.M. CT",
  wednesdayPrayerTitle: "Midweek meeting — Wednesday, May 27",
  wednesdayPrayerSummary:
    "Hosted by Nancy and Pastor Brian. Presidential Towers, Tower 1, 555 W. Madison St, Apt 2010. 6:15 p.m.",
  sundayPrayerGathering:
    "Saturday 6:30–6:45 p.m. on Zoom — prayer for Sunday worship. Sunday doors open 9:30 AM; worship 10:00 AM at Merit School.",
  churchZoomJoinUrl:
    "https://us02web.zoom.us/j/83078837399?pwd=SVRmWjNrdS80L3hid0tqSVFyeGg3Zz09",
  wednesdayZoomLink:
    "https://us02web.zoom.us/j/83078837399?pwd=SVRmWjNrdS80L3hid0tqSVFyeGg3Zz09",
  churchZoomMeetingId: "830 7883 7399",
  churchZoomPasscode: "662215",
};
