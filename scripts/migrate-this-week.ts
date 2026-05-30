/**
 * Migrate siteConfig upcoming/wednesday fields into the first thisWeek document.
 * Run: pnpm migrate:this-week
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { getSanityWriteClient } from "../packages/cms/client";
import { getSiteConfig } from "../packages/cms/queries/pages";
import { getNextSundayDate } from "../packages/cms/lib/thisWeekDates";
import { resolveChurchZoomJoinUrl } from "../packages/cms/lib/churchZoom";

function loadEnvLocal() {
  const path = resolve(process.cwd(), "apps/web/.env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnvLocal();
  const config = await getSiteConfig();
  const client = getSanityWriteClient();
  const weekOf = getNextSundayDate();
  const zoom =
    config.churchZoomJoinUrl?.trim() ||
    config.wednesdayZoomLink?.trim() ||
    resolveChurchZoomJoinUrl(config, process.env);

  const doc = {
    _type: "thisWeek" as const,
    _id: `thisWeek-${weekOf}`,
    week_of: weekOf,
    sunday_date: weekOf,
    sunday_time: "10:00 A.M. CT",
    sermon_title: config.upcomingSermonTitle?.trim() || "",
    sermon_scripture: "",
    sermon_description: config.upcomingSermonDescription?.trim(),
    venue_name: config.addressLine1?.trim() || "Merit School of Music",
    venue_address: config.addressLine2?.trim() || "38 S. Peoria St",
    venue_room: "2nd floor, room 210",
    zoom_link: zoom,
    zoom_passcode: config.churchZoomPasscode?.trim(),
    wednesday_time: "7:00 PM CT",
    wednesday_topic: config.wednesdayPrayerTitle?.trim(),
    wednesday_zoom_link: zoom,
    is_published: true,
  };

  const result = await client.createOrReplace(doc);
  console.log(`✓ Migrated siteConfig → thisWeek (${result._id})`);
  console.log("  siteConfig fields kept for backwards compatibility (CP-2 cleanup).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
