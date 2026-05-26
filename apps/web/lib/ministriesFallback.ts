import { MINISTRY_SEEDS, ministrySeedToDocument } from "@repo/cms";
import type { MinistryPage } from "@repo/cms";

/** Local fallback when Sanity is empty or unreachable (dev / before seed). */
export function getFallbackMinistries(): MinistryPage[] {
  return MINISTRY_SEEDS.map((seed) => {
    const doc = ministrySeedToDocument(seed);
    return {
      _id: doc._id,
      _type: "ministryPage",
      title: doc.title,
      slug: doc.slug,
      category: doc.category,
      summary: doc.summary,
      body: doc.body,
      canonicalPath: doc.canonicalPath,
      scheduleLabel: doc.scheduleLabel,
      scheduleDetails: doc.scheduleDetails,
      venueName: doc.venueName,
      venueAddress: doc.venueAddress,
      zoomLink: doc.zoomLink,
      liveStreamLink: doc.liveStreamLink,
      externalUrl: doc.externalUrl,
      ctaLabel: doc.ctaLabel,
      ctaHref: doc.ctaHref,
      heroImageUrl: doc.heroImageUrl,
      imageAlt: doc.imageAlt,
      sortOrder: doc.sortOrder,
      showOnHome: doc.showOnHome,
      status: "published",
    };
  });
}

export function getFallbackMinistryBySlug(slug: string): MinistryPage | null {
  return getFallbackMinistries().find((m) => m.slug.current === slug) ?? null;
}
