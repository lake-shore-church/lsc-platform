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
  resourceType,
  sermonType,
  sermonSeriesType,
  siteConfigType,
  staffBioType,
} from "./schemas";

export type {
  ThemeId,
  BlogPost,
  ContentTranslation,
  Event,
  Page,
  Resource,
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
  getAllSermonSlugs,
} from "./queries/sermons";

export { getEvents, getEventById } from "./queries/events";

export {
  getBlogPosts,
  getBlogPostBySlug,
  getAllBlogSlugs,
} from "./queries/blog";

export { getPage, getSiteConfig, getAllStaffBios } from "./queries/pages";
export { getResources } from "./queries/resources";

export { DEFAULT_SITE_CONFIG } from "./defaults/siteConfig";
export {
  mergeSiteConfig,
  formatSiteAddress,
  formatServiceStrip,
  buildChurchJsonLd,
} from "./lib/siteConfig";
export {
  buildLiveStatus,
  parseYouTubeVideoId,
  youtubeEmbedUrl,
  youtubeChatEmbedUrl,
  getNextSundayServiceAt,
  type LiveStatusResponse,
} from "./lib/livestream";
export {
  patchSiteLiveFields,
  goLiveInSanity,
  endLiveInSanity,
} from "./lib/patchSiteConfig";
export { seedSiteConfig } from "./seed/siteConfig";
export { seedSanityContent } from "./seed/content";
export { paragraphsToBlocks } from "./seed/portableText";
