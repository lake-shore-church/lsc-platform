import groq from "groq";
import type { SanityClient } from "@sanity/client";
import { getSanityReadClient } from "../client";
import type { Sermon, SermonSeries } from "../types";

function client(cms?: SanityClient) {
  return cms ?? getSanityReadClient();
}

const sermonProjection = `{
  _id,
  _type,
  title,
  slug,
  summary,
  scripture,
  publishedAt,
  videoUrl,
  audioUrl,
  featuredImage,
  "series": series->{
    _id,
    _type,
    title,
    slug,
    description,
    artwork,
    startDate,
    endDate,
    themeColor
  },
  "pastor": pastor->{
    _id,
    _type,
    name,
    slug,
    role,
    photo
  }
}`;

/** Published sermons, newest first. */
export async function getSermons(
  options?: { limit?: number },
  cms?: SanityClient,
): Promise<Sermon[]> {
  const slice = options?.limit != null ? `[0...${options.limit}]` : "";
  const query = groq`*[_type == "sermon" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) ${slice} ${sermonProjection}`;

  return client(cms).fetch<Sermon[]>(query);
}

/** Single sermon by slug. */
export async function getSermonBySlug(
  slug: string,
  cms?: SanityClient,
): Promise<Sermon | null> {
  const query = groq`*[_type == "sermon" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] ${sermonProjection}`;

  return client(cms).fetch<Sermon | null>(query, { slug });
}

/** All sermon series, newest start date first. */
export async function getSeriesList(cms?: SanityClient): Promise<SermonSeries[]> {
  const query = groq`*[_type == "sermonSeries"] | order(startDate desc) {
    _id,
    _type,
    title,
    slug,
    description,
    artwork,
    startDate,
    endDate,
    themeColor
  }`;

  return client(cms).fetch<SermonSeries[]>(query);
}

/** Sermons in a series by series slug. */
export async function getSermonsBySeries(
  seriesSlug: string,
  options?: { limit?: number },
  cms?: SanityClient,
): Promise<Sermon[]> {
  const slice = options?.limit != null ? `[0...${options.limit}]` : "";
  const query = groq`*[_type == "sermon" && series->slug.current == $seriesSlug && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) ${slice} ${sermonProjection}`;

  return client(cms).fetch<Sermon[]>(query, { seriesSlug });
}
