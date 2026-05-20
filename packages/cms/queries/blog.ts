import groq from "groq";
import type { SanityClient } from "@sanity/client";
import { getSanityReadClient } from "../client";
import type { BlogPost } from "../types";

function client(cms?: SanityClient) {
  return cms ?? getSanityReadClient();
}

const blogProjection = `{
  _id,
  _type,
  title,
  slug,
  excerpt,
  content,
  publishedAt,
  featuredImage,
  "author": author->{
    _id,
    _type,
    name,
    slug,
    role,
    photo
  }
}`;

/** Published blog posts, newest first. */
export async function getBlogPosts(
  options?: { limit?: number },
  cms?: SanityClient,
): Promise<BlogPost[]> {
  const slice = options?.limit != null ? `[0...${options.limit}]` : "";
  const query = groq`*[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) ${slice} ${blogProjection}`;

  return client(cms).fetch<BlogPost[]>(query);
}

/** Single published blog post by slug. */
export async function getBlogPostBySlug(
  slug: string,
  cms?: SanityClient,
): Promise<BlogPost | null> {
  const query = groq`*[_type == "blogPost" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] ${blogProjection}`;

  return client(cms).fetch<BlogPost | null>(query, { slug });
}
