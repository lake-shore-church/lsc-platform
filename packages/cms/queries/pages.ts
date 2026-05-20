import groq from "groq";
import type { SanityClient } from "@sanity/client";
import { getSanityReadClient } from "../client";
import type { Page, SiteConfig, StaffBio } from "../types";

function client(cms?: SanityClient) {
  return cms ?? getSanityReadClient();
}

/** Static page by slug (about, beliefs, visit, etc.). */
export async function getPage(
  slug: string,
  cms?: SanityClient,
): Promise<Page | null> {
  const query = groq`*[_type == "page" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    pageType,
    body,
    seoTitle,
    seoDescription
  }`;

  return client(cms).fetch<Page | null>(query, { slug });
}

/** Site-wide singleton config (first document). */
export async function getSiteConfig(cms?: SanityClient): Promise<SiteConfig | null> {
  const query = groq`*[_type == "siteConfig"][0] {
    _id,
    _type,
    activeTheme,
    churchName,
    tagline,
    address,
    phone,
    email,
    serviceTimes,
    socialLinks,
    paypalGivingEnabled,
    zeffyEmbedUrl
  }`;

  return client(cms).fetch<SiteConfig | null>(query);
}

/** All staff bios for leadership / about pages. */
export async function getAllStaffBios(cms?: SanityClient): Promise<StaffBio[]> {
  const query = groq`*[_type == "staffBio"] | order(sortOrder asc, name asc) {
    _id,
    _type,
    name,
    slug,
    role,
    photo,
    bio,
    sortOrder
  }`;

  return client(cms).fetch<StaffBio[]>(query);
}
