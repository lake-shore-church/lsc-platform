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
  ministryPageType,
  testimonyType,
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
  MinistryPage,
  MinistryCategory,
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
export {
  getMinistryPages,
  getMinistryPageBySlug,
  getHomeFeaturedMinistries,
  getAllMinistrySlugs,
} from "./queries/ministries";
export { getTestimonies } from "./queries/testimonies";
export { getResources } from "./queries/resources";

export { DEFAULT_SITE_CONFIG } from "./defaults/siteConfig";
export {
  resolveChurchZoomJoinUrl,
  resolveChurchZoomMeetingId,
  resolveChurchZoomPasscode,
  churchZoomJoinPath,
  CHURCH_ZOOM_DEFAULTS,
} from "./lib/churchZoom";
export {
  mergeSiteConfig,
  formatSiteAddress,
  formatServiceStrip,
  buildChurchJsonLd,
} from "./lib/siteConfig";
export {
  buildLiveStatus,
  isWithinSundayLiveWindow,
  parseYouTubeVideoId,
  resolveLiveStreamMode,
  youtubeEmbedUrl,
  youtubeChatEmbedUrl,
  getNextSundayServiceAt,
  type LiveStatusResponse,
  type LiveStreamMode,
} from "./lib/livestream";
export {
  patchSiteLiveFields,
  goLiveInSanity,
  goLiveInhouseInSanity,
  endLiveInSanity,
} from "./lib/patchSiteConfig";
export { seedSiteConfig } from "./seed/siteConfig";
export { seedSanityContent } from "./seed/content";
export {
  seedMinistryPages,
  MINISTRY_SEEDS,
  ministrySeedToDocument,
} from "./seed/ministries";
export { seedTestimonies } from "./seed/testimonies";
export { paragraphsToBlocks } from "./seed/portableText";
