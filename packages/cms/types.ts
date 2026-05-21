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
  zeffyEmbedUrl?: string;
  isLiveNow?: boolean;
  liveVideoId?: string;
  liveStreamUrl?: string;
  youtubeChannelId?: string;
  nextServiceDate?: string;
};
