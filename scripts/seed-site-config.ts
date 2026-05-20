/**
 * Seeds Sanity siteConfig with content from https://lschurch.com/
 * Run: pnpm seed:site-config
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { seedSiteConfig } from "../packages/cms/seed/siteConfig";

function loadEnvLocal() {
  const path = resolve(process.cwd(), "apps/web/.env.local");
  if (!existsSync(path)) {
    console.warn("No apps/web/.env.local found — using existing process.env");
    return;
  }
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
  const id = await seedSiteConfig();
  console.log(`✓ siteConfig seeded (document id: ${id})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
