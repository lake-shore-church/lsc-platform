import { createClient, type SanityClient } from "@sanity/client";

const API_VERSION = "2024-01-01";

function getProjectId(): string {
  const id = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!id) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Set it in apps/web/.env.local.",
    );
  }
  return id;
}

function getDataset(): string {
  return process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
}

function getWriteToken(): string {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) {
    throw new Error(
      "Missing SANITY_API_TOKEN for write client. Set it in apps/web/.env.local.",
    );
  }
  return token;
}

/** Read-only client (CDN, no token). Use in public pages and RSC. */
export function createSanityReadClient(): SanityClient {
  return createClient({
    projectId: getProjectId(),
    dataset: getDataset(),
    apiVersion: API_VERSION,
    useCdn: true,
  });
}

/** Authenticated client for Studio and server mutations. Never expose to browser. */
export function createSanityWriteClient(): SanityClient {
  return createClient({
    projectId: getProjectId(),
    dataset: getDataset(),
    apiVersion: API_VERSION,
    token: getWriteToken(),
    useCdn: false,
  });
}

let readClient: SanityClient | null = null;
let writeClient: SanityClient | null = null;

export function getSanityReadClient(): SanityClient {
  if (!readClient) readClient = createSanityReadClient();
  return readClient;
}

export function getSanityWriteClient(): SanityClient {
  if (!writeClient) writeClient = createSanityWriteClient();
  return writeClient;
}

/** Default read client for queries. */
export const sanityRead = getSanityReadClient;
