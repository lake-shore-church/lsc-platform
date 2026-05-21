const APP_URL = process.env.EXPO_PUBLIC_APP_URL ?? "http://localhost:3000";

export async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${APP_URL}${path}`);
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}

export type MobileSermon = {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  scripture?: string;
  publishedAt?: string;
  videoUrl?: string;
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

export type MobilePrayer = {
  id: string;
  content: string;
  created_at: string;
  status?: string;
};
