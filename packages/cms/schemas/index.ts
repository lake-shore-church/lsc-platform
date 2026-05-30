import { blogPostType } from "./blogPost";
import { ministryPageType } from "./ministryPage";
import { testimonyType } from "./testimony";
import { eventType } from "./event";
import { pageType } from "./page";
import { resourceType } from "./resource";
import { sermonType } from "./sermon";
import { sermonSeriesType } from "./sermonSeries";
import { siteConfigType } from "./siteConfig";
import { thisWeekType } from "./thisWeek";
import { staffBioType } from "./staffBio";

/** All document types for Sanity Studio config. */
export const schemaTypes = [
  thisWeekType,
  siteConfigType,
  sermonType,
  sermonSeriesType,
  eventType,
  blogPostType,
  staffBioType,
  pageType,
  resourceType,
  ministryPageType,
  testimonyType,
];

export {
  blogPostType,
  eventType,
  pageType,
  resourceType,
  sermonType,
  sermonSeriesType,
  siteConfigType,
  thisWeekType,
  staffBioType,
  ministryPageType,
  testimonyType,
};
