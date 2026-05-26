import { getSanityWriteClient } from "../client";
import { paragraphsToBlocks } from "./portableText";

const TESTIMONIES = [
  {
    _id: "testimony-hope",
    slug: "hope-in-the-gospel",
    title: "Hope in the gospel",
    kind: "story" as const,
    excerpt:
      "God met me in a season of loss and showed me life in Christ. Lake Shore became family.",
    imageUrl: "/church/community.webp",
  },
  {
    _id: "testimony-healing",
    slug: "healing-prayer",
    title: "Healing prayer",
    kind: "story" as const,
    excerpt:
      "The prayer team stood with our family; God answered in ways we did not expect.",
    imageUrl: "/church/worship.jpg",
  },
  {
    _id: "testimony-baptism",
    slug: "water-baptism-sunday",
    title: "Water baptism Sunday",
    kind: "video" as const,
    excerpt:
      "Going under the water was a public yes to Jesus — our church rejoiced with us.",
    imageUrl: "/church/worship.jpg",
  },
  {
    _id: "testimony-witness",
    slug: "witness-at-work",
    title: "Witness at work",
    kind: "audio" as const,
    excerpt:
      "A simple conversation over lunch opened the door to pray with a coworker.",
    imageUrl: "/church/serve.jpg",
  },
];

export async function seedTestimonies(): Promise<void> {
  const client = getSanityWriteClient();
  const now = new Date().toISOString();

  for (const item of TESTIMONIES) {
    await client.createOrReplace({
      _id: item._id,
      _type: "testimony",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      kind: item.kind,
      excerpt: item.excerpt,
      body: paragraphsToBlocks([item.excerpt]),
      imageUrl: item.imageUrl,
      publishedAt: now,
      status: "published",
    });
  }
}
