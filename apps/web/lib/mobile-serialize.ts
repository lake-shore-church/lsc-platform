import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { BlogPost, Sermon } from "@repo/cms";
import { getSanityReadClient } from "@repo/cms";

const builder = imageUrlBuilder(getSanityReadClient());

function imageUrl(
  source?: SanityImageSource | null,
  w = 640,
  h = 360,
): string | undefined {
  if (!source) return undefined;
  return builder.image(source).width(w).height(h).fit("crop").url();
}

function slideUrls(sermon: Sermon): string[] {
  const fromSlides =
    sermon.slides
      ?.map((s) => imageUrl(s, 1920, 1080))
      .filter((u): u is string => Boolean(u)) ?? [];
  if (fromSlides.length) return fromSlides;
  const fallback = imageUrl(sermon.featuredImage ?? sermon.series?.artwork, 1920, 1080);
  return fallback ? [fallback] : [];
}

/** JSON-safe sermon payload for /api/mobile/* */
export function serializeMobileSermon(sermon: Sermon) {
  return {
    _id: sermon._id,
    title: sermon.title,
    slug: sermon.slug,
    summary: sermon.summary,
    scripture: sermon.scripture,
    publishedAt: sermon.publishedAt,
    videoUrl: sermon.videoUrl,
    audioUrl: sermon.audioUrl,
    series: sermon.series
      ? { title: sermon.series.title, slug: sermon.series.slug }
      : null,
    pastor: sermon.pastor ? { name: sermon.pastor.name } : null,
    imageUrl: imageUrl(sermon.featuredImage ?? sermon.series?.artwork),
    slideUrls: slideUrls(sermon),
  };
}

export function serializeMobileBlogPost(post: BlogPost) {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    imageUrl: imageUrl(post.featuredImage, 400, 240),
  };
}

/** Plain text for mobile readers (no Portable Text renderer on device). */
export function portableTextToPlain(
  blocks?: Array<{ _type?: string; children?: Array<{ text?: string }> }>,
): string {
  if (!blocks?.length) return "";
  return blocks
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children.map((child) => child.text ?? "").join("");
    })
    .filter(Boolean)
    .join("\n\n");
}

export function serializeMobileBlogPostDetail(post: BlogPost) {
  return {
    ...serializeMobileBlogPost(post),
    body: portableTextToPlain(post.content),
    authorName: post.author?.name ?? null,
  };
}

/** JSON-safe event payload — same Supabase rows as the website /events page. */
export function serializeMobileEvent(event: {
  id: string;
  title: string;
  description?: string | null;
  starts_at: string;
  ends_at?: string | null;
  location?: string | null;
  ministry_area?: string | null;
  capacity?: number | null;
  image_url?: string | null;
}) {
  return {
    id: event.id,
    title: event.title,
    description: event.description ?? null,
    starts_at: event.starts_at,
    ends_at: event.ends_at ?? null,
    location: event.location ?? null,
    ministry_area: event.ministry_area ?? null,
    capacity: event.capacity ?? null,
    image_url: event.image_url ?? null,
  };
}
