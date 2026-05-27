/**
 * Remove duplicate sermon doc (same title, alternate slug) from Sanity.
 * Run: pnpm cleanup:duplicate-sermon
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { getSanityWriteClient } from "../packages/cms/client";

const DUPLICATE_ID = "sermon-four-key-ways-jesus-prepares-us";

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
    )
      value = value.slice(1, -1);
    if (!process.env[key]) process.env[key] = value;
  }
}

async function main() {
  loadEnvLocal();
  const client = getSanityWriteClient();
  await client.delete(DUPLICATE_ID);
  console.log(`✓ Deleted duplicate sermon ${DUPLICATE_ID}`);
  console.log("  Canonical slug: four-ways-jesus-prepares-us");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
