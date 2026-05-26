import type { MinistryPage } from "@repo/cms";

/** Resolved href for cards and links (canonical route or ministry detail). */
export function ministryHref(ministry: Pick<MinistryPage, "slug" | "canonicalPath">): string {
  if (ministry.canonicalPath) return ministry.canonicalPath;
  const slug = ministry.slug?.current;
  return slug ? `/ministries/${slug}` : "/ministries";
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}
