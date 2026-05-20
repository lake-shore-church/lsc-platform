/**
 * Seeds Sanity CMS content + Supabase sample data.
 * Run: pnpm seed:content
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { seedSanityContent } from "../packages/cms/seed/content";
import { seedSupabaseSample } from "../packages/cms/seed/supabaseSample";

function loadEnvLocal() {
  const path = resolve(process.cwd(), "apps/web/.env.local");
  if (!existsSync(path)) {
    console.warn("No apps/web/.env.local — using process.env");
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
  console.log("Seeding Sanity content…");
  await seedSanityContent();
  console.log("✓ Sanity: siteConfig, sermon, pages, blog, staff, series");

  console.log("Seeding Supabase sample data…");
  await seedSupabaseSample();
  console.log("✓ Supabase: 3 events, 1 prayer request");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
