/** Portable Text block (simplified — expand when rendering in apps). */
export type PortableTextBlock = {
  _type: string;
  _key?: string;
  children?: { _type: string; text?: string }[];
  [key: string]: unknown;
};

export type SanityImage = {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
};

export type SanitySlug = {
  _type: "slug";
  current: string;
};

export type SocialLink = {
  platform: string;
  url: string;
};

export type ServiceTime = {
  day: string;
  time: string;
  note?: string;
};

export type SermonSeries = {
  _id: string;
  _type: "sermonSeries";
  title: string;
  slug: SanitySlug;
  description?: string;
  artwork?: SanityImage;
  startDate?: string;
  endDate?: string;
  themeColor?: string;
};

export type TranslationStatus = "draft" | "review" | "published";

export type ContentTranslation = {
  locale: string;
  title?: string;
  excerpt?: string;
  status?: TranslationStatus;
  reviewer?: string;
  approved?: boolean;
};

export type Sermon = {
  _id: string;
  _type: "sermon";
  title: string;
  slug: SanitySlug;
  summary?: string;
  scripture?: string;
  publishedAt?: string;
  videoUrl?: string;
  audioUrl?: string;
  featuredImage?: SanityImage;
  slides?: SanityImage[];
  series?: SermonSeries | null;
  pastor?: StaffBio | null;
  translations?: ContentTranslation[];
};

export type Event = {
  _id: string;
  _type: "event";
  title: string;
  slug?: SanitySlug;
  description?: string;
  startsAt: string;
  endsAt?: string;
  location?: string;
  ministryArea?: string;
  image?: SanityImage;
  isRecurring?: boolean;
};

export type BlogPost = {
  _id: string;
  _type: "blogPost";
  title: string;
  slug: SanitySlug;
  excerpt?: string;
  content?: PortableTextBlock[];
  publishedAt?: string;
  featuredImage?: SanityImage;
  author?: StaffBio | null;
  translations?: ContentTranslation[];
};

export type StaffBio = {
  _id: string;
  _type: "staffBio";
  name: string;
  slug: SanitySlug;
  role?: string;
  photo?: SanityImage;
  bio?: PortableTextBlock[];
  sortOrder?: number;
};

export type Page = {
  _id: string;
  _type: "page";
  title: string;
  slug: SanitySlug;
  pageType: "about" | "beliefs" | "visit" | "custom";
  body?: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

export type MinistryCategory =
  | "watch"
  | "connect"
  | "grow"
  | "serve"
  | "missions"
  | "church-life";

export type Testimony = {
  _id: string;
  _type: "testimony";
  title: string;
  slug: SanitySlug;
  kind?: "story" | "video" | "audio";
  excerpt?: string;
  body?: PortableTextBlock[];
  imageUrl?: string;
  videoUrl?: string;
  audioUrl?: string;
  publishedAt?: string;
  status?: "published" | "draft";
};

export type MinistryPage = {
  _id: string;
  _type: "ministryPage";
  title: string;
  slug: SanitySlug;
  category: MinistryCategory;
  summary?: string;
  body?: PortableTextBlock[];
  canonicalPath?: string;
  scheduleLabel?: string;
  scheduleDetails?: string;
  venueName?: string;
  venueAddress?: string;
  zoomLink?: string;
  liveStreamLink?: string;
  externalUrl?: string;
  ctaLabel?: string;
  ctaHref?: string;
  heroImageUrl?: string;
  imageAlt?: string;
  sortOrder?: number;
  showOnHome?: boolean;
  status?: "published" | "draft";
  seoTitle?: string;
  seoDescription?: string;
};

export type ThemeId = "bold" | "warm" | "advent" | "easter";

export type Resource = {
  _id: string;
  _type: "resource";
  title: string;
  slug?: SanitySlug;
  description?: string;
  type?: "book" | "pdf" | "link";
  externalUrl?: string;
  isPublic?: boolean;
};

export type SiteConfig = {
  _id: string;
  _type: "siteConfig";
  activeTheme?: ThemeId;
  churchName: string;
  tagline?: string;
  subTagline?: string;
  heroBody?: string;
  heroCtaText?: string;
  distinctives?: string;
  serviceInvitation?: string;
  addressLine1?: string;
  addressLine2?: string;
  cityStateZip?: string;
  address?: string;
  phone?: string;
  email?: string;
  serviceDay?: string;
  serviceTime?: string;
  pastorName?: string;
  serviceTimes?: ServiceTime[];
  socialLinks?: SocialLink[];
  paypalGivingEnabled?: boolean;
  paypalGivingUrl?: string;
  churchTaxId?: string;
  zeffyEmbedUrl?: string;
  isLiveNow?: boolean;
  /** `inhouse` = Mevo → Mux HLS on our app; `youtube` = legacy embed fallback */
  liveStreamMode?: "inhouse" | "youtube";
  /** HLS playback URL (.m3u8) when liveStreamMode is inhouse */
  livePlaybackUrl?: string;
  liveVideoId?: string;
  liveStreamUrl?: string;
  youtubeChannelId?: string;
  nextServiceDate?: string;
  yearPromiseScripture?: string;
  yearPromiseTheme?: string;
  yearPromiseBody?: string;
  familyVisionLine?: string;
  sundayPrayerGathering?: string;
  wednesdayPrayerTitle?: string;
  wednesdayPrayerSummary?: string;
  wednesdayZoomLink?: string;
  churchZoomJoinUrl?: string;
  churchZoomMeetingId?: string;
  churchZoomPasscode?: string;
  upcomingSermonTitle?: string;
  upcomingSermonDescription?: string;
  upcomingSermonDate?: string;
};

export type ThisWeek = {
  _id?: string;
  week_of: string;
  sunday_date?: string;
  sunday_time?: string;
  sermon_title?: string;
  sermon_scripture?: string;
  sermon_description?: string;
  venue_name?: string;
  venue_address?: string;
  venue_room?: string;
  zoom_link?: string;
  zoom_passcode?: string;
  wednesday_date?: string;
  wednesday_time?: string;
  wednesday_topic?: string;
  wednesday_zoom_link?: string;
  wednesday_venue?: string;
  sunday_school_topic?: string;
  sunday_school_scripture?: string;
  sunday_school_teacher?: string;
  special_announcement?: string;
  is_published?: boolean;
};

export type ResolvedThisWeek = {
  source: "thisWeek" | "siteConfig";
  week_of?: string;
  sunday_date?: string;
  sunday_time: string;
  sermon_title: string;
  sermon_scripture?: string;
  sermon_description?: string;
  venue_name: string;
  venue_address?: string;
  venue_room?: string;
  zoom_link?: string;
  zoom_passcode?: string;
  wednesday_date?: string;
  wednesday_time?: string;
  wednesday_topic?: string;
  wednesday_zoom_link?: string;
  wednesday_venue?: string;
  sunday_school_topic?: string;
  sunday_school_scripture?: string;
  sunday_school_teacher?: string;
  special_announcement?: string;
  sunday_date_label?: string;
};
