import groq from "groq";
import type { SanityClient } from "@sanity/client";
import { getSanityReadClient } from "../client";
import type { Testimony } from "../types";

function client(cms?: SanityClient) {
  return cms ?? getSanityReadClient();
}

export async function getTestimonies(cms?: SanityClient): Promise<Testimony[]> {
  const query = groq`*[_type == "testimony" && status == "published"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    kind,
    excerpt,
    body,
    imageUrl,
    videoUrl,
    audioUrl,
    publishedAt,
    status
  }`;
  return client(cms).fetch<Testimony[]>(query);
}
