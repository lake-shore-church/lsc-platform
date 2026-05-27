/** Canonical public origin for links, RSS, and redirects. */
export function getPublicSiteUrl(): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (site) return site;

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "");
    return `https://${host}`;
  }

  const app = process.env.NEXT_PUBLIC_APP_URL?.trim().replace(/\/$/, "");
  if (app) return app;

  return "https://lsc-platform-kappa.vercel.app";
}

export const SITE_URL = getPublicSiteUrl();

export const SITE_NAME = "Lake Shore Church — West Loop";

export const CHURCH_ADDRESS =
  "Merit School of Music\n38 S. Peoria St, 2nd floor, room 210\nChicago, IL 60607";
