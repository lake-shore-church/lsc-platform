/**
 * Patch Sanity siteConfig from Pastor's weekly email (no full site replace).
 * Run: pnpm seed:weekly-update
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { getSanityWriteClient } from "../packages/cms/client";
import { WEEK_2026_05_31 } from "../packages/cms/seed/weeklyUpdates";

const SITE_CONFIG_ID = "siteConfig";

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
  const patch = WEEK_2026_05_31;
  const client = getSanityWriteClient();

  await client.patch(SITE_CONFIG_ID).set(patch).commit();

  console.log("✓ siteConfig updated for week of Sunday May 31, 2026");
  console.log(`  Sermon: ${patch.upcomingSermonTitle}`);
  console.log(`  Wednesday: ${patch.wednesdayPrayerTitle}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
