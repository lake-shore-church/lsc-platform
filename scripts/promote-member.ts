/**
 * Promote a user to member or staff by email.
 * Run: pnpm promote:member user@example.com member
 * Requires SUPABASE_SERVICE_ROLE_KEY in apps/web/.env.local
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createSupabaseAdminClient } from "../packages/db";
import type { UserRole } from "../packages/db";

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

const ROLES: UserRole[] = ["member", "staff", "admin"];

async function main() {
  loadEnvLocal();

  const email = process.argv[2]?.trim().toLowerCase();
  const role = (process.argv[3]?.trim() ?? "member") as UserRole;

  if (!email) {
    console.error("Usage: pnpm promote:member <email> [member|staff|admin]");
    process.exit(1);
  }

  if (!ROLES.includes(role)) {
    console.error(`Invalid role "${role}". Use: ${ROLES.join(", ")}`);
    process.exit(1);
  }

  const supabase = createSupabaseAdminClient();
  const { data: profile, error: findError } = await supabase
    .from("profiles")
    .select("id, email, role")
    .ilike("email", email)
    .maybeSingle();

  if (findError) {
    console.error("Lookup failed:", findError.message);
    process.exit(1);
  }

  if (!profile) {
    console.error(`No profile found for ${email}. User must sign up first.`);
    process.exit(1);
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ role, updated_at: new Date().toISOString() })
    .eq("id", profile.id);

  if (updateError) {
    console.error("Update failed:", updateError.message);
    process.exit(1);
  }

  console.log(`Updated ${email}: ${profile.role} → ${role}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
