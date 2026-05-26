/**
 * Seed ministry pages into Sanity (requires SANITY_WRITE_TOKEN).
 * Usage: pnpm seed:ministries
 */
import { seedMinistryPages } from "@repo/cms";

async function main() {
  await seedMinistryPages();
  console.log("Ministry pages seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
