import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { BlogPost, Sermon } from "@repo/cms";
import { getSanityReadClient } from "@repo/cms";

const builder = imageUrlBuilder(getSanityReadClient());

function imageUrl(source?: SanityImageSource | null, w = 640, h = 360): string | undefined {
  if (!source) return undefined;
  return builder.image(source).width(w).height(h).fit("crop").url();
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
    series: sermon.series
      ? { title: sermon.series.title, slug: sermon.series.slug }
      : null,
    pastor: sermon.pastor ? { name: sermon.pastor.name } : null,
    imageUrl: imageUrl(sermon.featuredImage ?? sermon.series?.artwork),
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
