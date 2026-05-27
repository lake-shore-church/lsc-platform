import type { MinistryPage } from "@repo/cms";

/** Slugs kept in CMS but hidden from the public hub (placeholders / TBD). */
const HUB_EXCLUDED_SLUGS = new Set([
  "multi-conferences",
  "radio-ministry",
  "bible-theology-assistant",
]);

/**
 * Ministries hub shows only dedicated ministry pages — not cards that
 * duplicate top-level routes (Give, Visit, Sermons, etc.).
 */
export function isMinistryHubEntry(ministry: MinistryPage): boolean {
  const slug = ministry.slug?.current;
  if (slug && HUB_EXCLUDED_SLUGS.has(slug)) return false;
  if (ministry.canonicalPath) return false;
  return true;
}

export function filterMinistriesForHub(pages: MinistryPage[]): MinistryPage[] {
  return pages
    .filter(isMinistryHubEntry)
    .sort((a, b) => (a.sortOrder ?? 999) - (b.sortOrder ?? 999));
}

/** Primary site routes — linked once at top of /ministries instead of repeated cards. */
export const MINISTRIES_QUICK_LINKS = [
  { href: "/give", label: "Give" },
  { href: "/visit", label: "Plan a visit" },
  { href: "/events", label: "Events" },
  { href: "/prayer", label: "Prayer" },
  { href: "/sermons", label: "Sermons" },
  { href: "/live", label: "Live stream" },
  { href: "/blog", label: "Blog" },
  { href: "/beliefs", label: "Beliefs" },
  { href: "/testimonies", label: "Testimonies" },
  { href: "/faq", label: "FAQ" },
] as const;
