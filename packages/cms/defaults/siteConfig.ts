import type { SiteConfig } from "../types";

/** Canonical Lake Shore Church content from https://lschurch.com/ */
export const DEFAULT_SITE_CONFIG: Omit<SiteConfig, "_id" | "_type"> = {
  churchName: "Lake Shore Church — West Loop",
  tagline: "God raised Jesus from the dead.",
  subTagline: "There is hope for all who follow him.",
  heroBody:
    "In a world of pain, death, and evil, there is hope in the Son of God.",
  heroCtaText: "Our church can help you follow Jesus.",
  distinctives:
    "Find inerrant truth from Scripture in a world of confusion.",
  serviceInvitation: "We hope to see you there!",
  addressLine1: "Merit School of Music",
  addressLine2: "38 S. Peoria St, 2nd floor, room 210",
  cityStateZip: "Chicago, IL 60607",
  phone: "(312) 464-1834",
  serviceDay: "Sunday",
  serviceTime: "Begins at 10 A.M.",
  pastorName: "Pastor Brian",
  zeffyEmbedUrl: "",
  paypalGivingEnabled: true,
  paypalGivingUrl: "",
  churchTaxId: "",
  activeTheme: "bold",
  isLiveNow: false,
  liveVideoId: "",
  liveStreamUrl: "",
  youtubeChannelId: "",
};
