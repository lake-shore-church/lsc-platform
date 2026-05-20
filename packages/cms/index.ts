export {
  createSanityReadClient,
  createSanityWriteClient,
  getSanityReadClient,
  getSanityWriteClient,
  sanityRead,
} from "./client";

export type { SanityClient } from "@sanity/client";

export { schemaTypes } from "./schemas";
export {
  blogPostType,
  eventType,
  pageType,
  sermonType,
  sermonSeriesType,
  siteConfigType,
  staffBioType,
} from "./schemas";

export type {
  ThemeId,
  BlogPost,
  Event,
  Page,
  PortableTextBlock,
  SanityImage,
  SanitySlug,
  Sermon,
  SermonSeries,
  ServiceTime,
  SiteConfig,
  SocialLink,
  StaffBio,
} from "./types";

export {
  getSermons,
  getSermonBySlug,
  getSeriesList,
  getSermonsBySeries,
} from "./queries/sermons";

export { getEvents, getEventById } from "./queries/events";

export { getBlogPosts, getBlogPostBySlug } from "./queries/blog";

export { getPage, getSiteConfig, getAllStaffBios } from "./queries/pages";
