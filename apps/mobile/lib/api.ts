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
  starts_at: string;
  ends_at?: string | null;
  location?: string | null;
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

export type MobilePrayer = {
  id: string;
  content: string;
  created_at: string;
  status?: string;
};
