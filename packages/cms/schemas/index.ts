import { blogPostType } from "./blogPost";
import { eventType } from "./event";
import { pageType } from "./page";
import { resourceType } from "./resource";
import { sermonType } from "./sermon";
import { sermonSeriesType } from "./sermonSeries";
import { siteConfigType } from "./siteConfig";
import { staffBioType } from "./staffBio";

/** All document types for Sanity Studio config. */
export const schemaTypes = [
  siteConfigType,
  sermonType,
  sermonSeriesType,
  eventType,
  blogPostType,
  staffBioType,
  pageType,
  resourceType,
];

export {
  blogPostType,
  eventType,
  pageType,
  resourceType,
  sermonType,
  sermonSeriesType,
  siteConfigType,
  staffBioType,
};
