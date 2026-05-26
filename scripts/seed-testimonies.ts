import { seedTestimonies } from "@repo/cms";

async function main() {
  await seedTestimonies();
  console.log("Testimonies seeded successfully.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
