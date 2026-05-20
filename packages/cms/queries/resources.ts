import groq from "groq";
import type { SanityClient } from "@sanity/client";
import { getSanityReadClient } from "../client";
import type { Resource } from "../types";

function client(cms?: SanityClient) {
  return cms ?? getSanityReadClient();
}

export async function getResources(
  options?: { publicOnly?: boolean; limit?: number },
  cms?: SanityClient,
): Promise<Resource[]> {
  const filters = ['_type == "resource"'];
  if (options?.publicOnly !== false) filters.push("isPublic == true");
  const slice = options?.limit != null ? `[0...${options.limit}]` : "";
  const query = groq`*[${filters.join(" && ")}] | order(title asc) ${slice} {
    _id,
    _type,
    title,
    slug,
    description,
    type,
    externalUrl,
    isPublic
  }`;

  return client(cms).fetch<Resource[]>(query);
}
