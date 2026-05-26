import groq from "groq";
import type { SanityClient } from "@sanity/client";
import { getSanityReadClient } from "../client";
import type { MinistryPage } from "../types";

function client(cms?: SanityClient) {
  return cms ?? getSanityReadClient();
}

const ministryFields = groq`
  _id,
  _type,
  title,
  slug,
  category,
  summary,
  body,
  canonicalPath,
  scheduleLabel,
  scheduleDetails,
  venueName,
  venueAddress,
  zoomLink,
  liveStreamLink,
  externalUrl,
  ctaLabel,
  ctaHref,
  heroImageUrl,
  imageAlt,
  sortOrder,
  showOnHome,
  status,
  seoTitle,
  seoDescription
`;

export async function getMinistryPages(cms?: SanityClient): Promise<MinistryPage[]> {
  const query = groq`*[_type == "ministryPage" && status == "published"] | order(sortOrder asc, title asc) {
    ${ministryFields}
  }`;
  return client(cms).fetch<MinistryPage[]>(query);
}

export async function getMinistryPageBySlug(
  slug: string,
  cms?: SanityClient,
): Promise<MinistryPage | null> {
  const query = groq`*[_type == "ministryPage" && slug.current == $slug && status == "published"][0] {
    ${ministryFields}
  }`;
  return client(cms).fetch<MinistryPage | null>(query, { slug });
}

export async function getHomeFeaturedMinistries(
  cms?: SanityClient,
): Promise<MinistryPage[]> {
  const query = groq`*[_type == "ministryPage" && status == "published" && showOnHome == true] | order(sortOrder asc) [0...6] {
    ${ministryFields}
  }`;
  return client(cms).fetch<MinistryPage[]>(query);
}

export async function getAllMinistrySlugs(cms?: SanityClient): Promise<string[]> {
  const query = groq`*[_type == "ministryPage" && status == "published" && !defined(canonicalPath)].slug.current`;
  return client(cms).fetch<string[]>(query);
}
