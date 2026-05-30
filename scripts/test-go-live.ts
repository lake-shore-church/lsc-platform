/**
 * Turn test live on/off in Sanity (for mobile/web Live tab testing).
 * Run: pnpm tsx scripts/test-go-live.ts [youtubeVideoIdOrUrl]
 * End: pnpm tsx scripts/test-go-live.ts --end
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { endLiveInSanity, goLiveInSanity } from "../packages/cms/lib/patchSiteConfig";
import { getSanityWriteClient } from "../packages/cms/client";

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

async function printSanityLive() {
  const doc = await getSanityWriteClient().fetch<{
    isLiveNow?: boolean;
    liveVideoId?: string;
    liveStreamMode?: string;
  }>(`*[_id == "siteConfig"][0]{ isLiveNow, liveVideoId, liveStreamMode }`);
  console.log("  Sanity (fresh):", doc);
}

async function main() {
  loadEnvLocal();
  const arg = process.argv[2];
  if (arg === "--end") {
    await endLiveInSanity();
    console.log("✓ Live stream ended (isLiveNow = false)");
    await printSanityLive();
    return;
  }
  const video = arg ?? "LXbS7s2eNvY";
  const id = await goLiveInSanity(video);
  console.log(`✓ Live stream ON — videoId: ${id ?? video}`);
  await printSanityLive();
  console.log("  Check: https://lsc-platform-kappa.vercel.app/api/live-status");
  console.log("  (API may lag ~1 min due to cache; mobile polls every 15s when live)");
  console.log("  Mobile: Sermons → Live tab");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
