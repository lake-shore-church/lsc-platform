export { fetchJson } from "./fetchJson";

export type MobileSermon = {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  scripture?: string;
  publishedAt?: string;
  videoUrl?: string;
  audioUrl?: string;
  imageUrl?: string;
  slideUrls?: string[];
  series?: { title: string; slug: { current: string } } | null;
  pastor?: { name: string } | null;
};

export type MobileEvent = {
  id: string;
  title: string;
  description?: string | null;
  starts_at: string;
  ends_at?: string | null;
  location?: string | null;
  ministry_area?: string | null;
  capacity?: number | null;
  image_url?: string | null;
};

export type MobileBlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  imageUrl?: string;
};

export type MobileBlogPostDetail = MobileBlogPost & {
  body?: string;
  authorName?: string | null;
};

export type MobileThisWeek = {
  source: "thisWeek" | "siteConfig";
  sunday_time: string;
  sermon_title: string;
  sermon_scripture?: string;
  sermon_description?: string;
  venue_name: string;
  venue_room?: string;
  sunday_date_label?: string;
  zoom_link?: string;
  wednesday_topic?: string;
  wednesday_time?: string;
  sunday_school_topic?: string;
};

export type MobilePrayer = {
  id: string;
  content: string;
  created_at: string;
  status?: string;
};
