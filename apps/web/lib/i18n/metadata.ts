import type { Metadata } from "next";
import { locales } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

/** hreflang alternates for all active locales (English at site root). */
export function buildHreflangLanguages(path = ""): Metadata["alternates"] {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  const languages: Record<string, string> = {};

  for (const locale of locales) {
    const prefix = locale === "en" ? "" : `/${locale}`;
    languages[locale] = `${SITE_URL}${prefix}${normalized}`;
  }

  languages["x-default"] = `${SITE_URL}${normalized}`;

  return { languages };
}
