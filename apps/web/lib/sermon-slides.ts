import type { Sermon } from "@repo/cms";
import { urlFor } from "@/lib/sanity";

/** Projector-quality slide URLs for presenter + web sync. */
export function getSermonSlideUrls(sermon: Sermon): string[] {
  const fromSlides =
    sermon.slides
      ?.map((s) => urlFor(s).width(1920).height(1080).fit("crop").url())
      .filter(Boolean) ?? [];
  if (fromSlides.length) return fromSlides;
  const img = sermon.featuredImage ?? sermon.series?.artwork;
  if (!img) return [];
  return [urlFor(img).width(1920).height(1080).fit("crop").url()];
}
