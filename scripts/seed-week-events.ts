/**
 * Upsert Supabase events for the current week (from Pastor email May 26, 2026).
 * Run: pnpm seed:week-events
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../packages/db/types";

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for seeding.",
    );
  }
  return createClient<Database>(url, key);
}

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
  const supabase = getAdminClient();

  const events = [
    {
      id: "a1000001-0001-4001-8001-000000000010",
      title: "Providence Lunch — after worship",
      description:
        "Celebrate Ruth’s return, Eunice’s and Ishaku’s graduations, and summertime with a providence lunch together after Sunday worship.",
      starts_at: "2026-05-31T17:30:00+00:00",
      ends_at: "2026-05-31T19:00:00+00:00",
      location: "Merit School of Music — Room 210",
      ministry_area: "Community",
      capacity: null,
      is_recurring: false,
    },
    {
      id: "a1000001-0001-4001-8001-000000000011",
      title: "Midweek meeting",
      description:
        "Hosted by Nancy and Pastor Brian. Presidential Towers, Tower 1, 555 W. Madison St, Apt 2010.",
      starts_at: "2026-05-27T23:15:00+00:00",
      ends_at: "2026-05-28T01:00:00+00:00",
      location: "Presidential Towers — 555 W. Madison St, Apt 2010",
      ministry_area: "Fellowship",
      capacity: null,
      is_recurring: false,
    },
  ];

  for (const event of events) {
    const { error } = await supabase.from("events").upsert(event, { onConflict: "id" });
    if (error) throw error;
    console.log(`✓ event: ${event.title}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
