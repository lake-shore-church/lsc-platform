import { getSanityWriteClient } from "../client";
import { DEFAULT_SITE_CONFIG } from "../defaults/siteConfig";

const SITE_CONFIG_ID = "siteConfig";

/** Create or replace the siteConfig singleton in Sanity with lschurch.com content. */
export async function seedSiteConfig(): Promise<string> {
  const client = getSanityWriteClient();

  const doc = {
    _id: SITE_CONFIG_ID,
    _type: "siteConfig" as const,
    churchName: DEFAULT_SITE_CONFIG.churchName,
    tagline: DEFAULT_SITE_CONFIG.tagline,
    subTagline: DEFAULT_SITE_CONFIG.subTagline,
    heroBody: DEFAULT_SITE_CONFIG.heroBody,
    addressLine1: DEFAULT_SITE_CONFIG.addressLine1,
    addressLine2: DEFAULT_SITE_CONFIG.addressLine2,
    cityStateZip: DEFAULT_SITE_CONFIG.cityStateZip,
    phone: DEFAULT_SITE_CONFIG.phone,
    serviceDay: DEFAULT_SITE_CONFIG.serviceDay,
    serviceTime: DEFAULT_SITE_CONFIG.serviceTime,
    pastorName: DEFAULT_SITE_CONFIG.pastorName,
    zeffyEmbedUrl: DEFAULT_SITE_CONFIG.zeffyEmbedUrl,
    paypalGivingEnabled: DEFAULT_SITE_CONFIG.paypalGivingEnabled,
    activeTheme: DEFAULT_SITE_CONFIG.activeTheme,
  };

  const result = await client.createOrReplace(doc);
  return result._id;
}
