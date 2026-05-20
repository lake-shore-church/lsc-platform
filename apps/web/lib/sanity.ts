import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { getSanityReadClient } from "@repo/cms";

const builder = imageUrlBuilder(getSanityReadClient());

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function slugValue(slug?: { current?: string } | string): string {
  if (!slug) return "";
  if (typeof slug === "string") return slug;
  return slug.current ?? "";
}
