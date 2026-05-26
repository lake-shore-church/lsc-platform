import type { SiteConfig } from "../types";
import { DEFAULT_SITE_CONFIG } from "../defaults/siteConfig";

/** Merge CMS document with canonical defaults (lschurch.com). */
export function mergeSiteConfig(
  doc: SiteConfig | null | undefined,
): SiteConfig {
  if (!doc) {
    return {
      _id: "default",
      _type: "siteConfig",
      ...DEFAULT_SITE_CONFIG,
    };
  }

  return {
    ...doc,
    churchName: doc.churchName || DEFAULT_SITE_CONFIG.churchName,
    tagline: doc.tagline || DEFAULT_SITE_CONFIG.tagline,
    subTagline: doc.subTagline || DEFAULT_SITE_CONFIG.subTagline,
    heroBody: doc.heroBody || DEFAULT_SITE_CONFIG.heroBody,
    heroCtaText: doc.heroCtaText || DEFAULT_SITE_CONFIG.heroCtaText,
    distinctives: doc.distinctives || DEFAULT_SITE_CONFIG.distinctives,
    serviceInvitation:
      doc.serviceInvitation || DEFAULT_SITE_CONFIG.serviceInvitation,
    addressLine1: doc.addressLine1 || DEFAULT_SITE_CONFIG.addressLine1,
    addressLine2: doc.addressLine2 || DEFAULT_SITE_CONFIG.addressLine2,
    cityStateZip: doc.cityStateZip || DEFAULT_SITE_CONFIG.cityStateZip,
    phone: doc.phone || DEFAULT_SITE_CONFIG.phone,
    serviceDay: doc.serviceDay || DEFAULT_SITE_CONFIG.serviceDay,
    serviceTime: doc.serviceTime || DEFAULT_SITE_CONFIG.serviceTime,
    pastorName: doc.pastorName || DEFAULT_SITE_CONFIG.pastorName,
    activeTheme: (() => {
      const t = doc.activeTheme as string | undefined;
      if (t === "default" || !t) return DEFAULT_SITE_CONFIG.activeTheme;
      if (t === "bold" || t === "warm" || t === "advent" || t === "easter") return t;
      return DEFAULT_SITE_CONFIG.activeTheme;
    })(),
    paypalGivingEnabled:
      doc.paypalGivingEnabled ?? DEFAULT_SITE_CONFIG.paypalGivingEnabled,
    paypalGivingUrl: doc.paypalGivingUrl ?? DEFAULT_SITE_CONFIG.paypalGivingUrl,
    churchTaxId: doc.churchTaxId ?? DEFAULT_SITE_CONFIG.churchTaxId,
    zeffyEmbedUrl:
      doc.zeffyEmbedUrl !== undefined
        ? doc.zeffyEmbedUrl
        : DEFAULT_SITE_CONFIG.zeffyEmbedUrl,
    isLiveNow: doc.isLiveNow ?? DEFAULT_SITE_CONFIG.isLiveNow,
    liveVideoId: doc.liveVideoId ?? DEFAULT_SITE_CONFIG.liveVideoId,
    liveStreamUrl: doc.liveStreamUrl ?? DEFAULT_SITE_CONFIG.liveStreamUrl,
    youtubeChannelId:
      doc.youtubeChannelId ?? DEFAULT_SITE_CONFIG.youtubeChannelId,
    nextServiceDate: doc.nextServiceDate,
    yearPromiseScripture:
      doc.yearPromiseScripture ?? DEFAULT_SITE_CONFIG.yearPromiseScripture,
    yearPromiseTheme: doc.yearPromiseTheme ?? DEFAULT_SITE_CONFIG.yearPromiseTheme,
    yearPromiseBody: doc.yearPromiseBody ?? DEFAULT_SITE_CONFIG.yearPromiseBody,
    familyVisionLine: doc.familyVisionLine ?? DEFAULT_SITE_CONFIG.familyVisionLine,
    sundayPrayerGathering:
      doc.sundayPrayerGathering ?? DEFAULT_SITE_CONFIG.sundayPrayerGathering,
    wednesdayPrayerTitle:
      doc.wednesdayPrayerTitle ?? DEFAULT_SITE_CONFIG.wednesdayPrayerTitle,
    wednesdayPrayerSummary:
      doc.wednesdayPrayerSummary ?? DEFAULT_SITE_CONFIG.wednesdayPrayerSummary,
    wednesdayZoomLink: doc.wednesdayZoomLink ?? DEFAULT_SITE_CONFIG.wednesdayZoomLink,
    churchZoomJoinUrl: doc.churchZoomJoinUrl ?? DEFAULT_SITE_CONFIG.churchZoomJoinUrl,
    churchZoomMeetingId:
      doc.churchZoomMeetingId ?? DEFAULT_SITE_CONFIG.churchZoomMeetingId,
    churchZoomPasscode:
      doc.churchZoomPasscode ?? DEFAULT_SITE_CONFIG.churchZoomPasscode,
    upcomingSermonTitle: doc.upcomingSermonTitle,
    upcomingSermonDescription: doc.upcomingSermonDescription,
    upcomingSermonDate: doc.upcomingSermonDate,
  };
}

export function formatSiteAddress(config: SiteConfig): string {
  const lines = [
    config.addressLine1,
    config.addressLine2,
    config.cityStateZip,
  ].filter(Boolean);
  if (lines.length) return lines.join("\n");
  return config.address ?? "";
}

/** e.g. Sunday Service · 10:00 AM · 38 S. Peoria St, 2nd floor · Chicago IL 60607 */
export function formatServiceStrip(config: SiteConfig): string {
  const day = config.serviceDay ?? "Sunday";
  const label = day === "Sunday" ? "Sunday Service" : `${day} Service`;
  const parts = [
    label,
    config.serviceTime,
    config.addressLine2,
    config.cityStateZip?.replace(", ", " "),
  ].filter(Boolean);
  return parts.join(" · ");
}

export function buildChurchJsonLd(
  config: SiteConfig,
  siteUrl: string,
): Record<string, unknown> {
  const street = [config.addressLine1, config.addressLine2]
    .filter(Boolean)
    .join(", ");

  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: config.churchName,
    url: siteUrl,
    telephone: config.phone,
    description: config.tagline,
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: "Chicago",
      addressRegion: "IL",
      postalCode: "60607",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "https://schema.org/Sunday",
        opens: "10:00",
        closes: "12:00",
      },
    ],
    ...(config.pastorName
      ? {
          employee: {
            "@type": "Person",
            name: config.pastorName,
            jobTitle: "Pastor",
          },
        }
      : {}),
  };
}
