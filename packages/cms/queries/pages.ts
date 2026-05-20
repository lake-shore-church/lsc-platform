import groq from "groq";
import type { SanityClient } from "@sanity/client";
import { getSanityReadClient } from "../client";
import { mergeSiteConfig } from "../lib/siteConfig";
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

/** Site-wide singleton config (merged with lschurch.com defaults). */
export async function getSiteConfig(cms?: SanityClient): Promise<SiteConfig> {
  const query = groq`*[_type == "siteConfig"][0] {
    _id,
    _type,
    activeTheme,
    churchName,
    tagline,
    subTagline,
    heroBody,
    addressLine1,
    addressLine2,
    cityStateZip,
    address,
    phone,
    email,
    serviceDay,
    serviceTime,
    pastorName,
    serviceTimes,
    socialLinks,
    paypalGivingEnabled,
    zeffyEmbedUrl
  }`;

  try {
    const doc = await client(cms).fetch<SiteConfig | null>(query);
    return mergeSiteConfig(doc);
  } catch {
    return mergeSiteConfig(null);
  }
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
