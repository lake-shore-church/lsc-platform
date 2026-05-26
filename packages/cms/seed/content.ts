import { getSanityWriteClient } from "../client";
import { paragraphsToBlocks } from "./portableText";
import {
  BLOG_POSTS,
  REAL_SITE_CONFIG,
  RESOURCE_BOOK,
  SERIES,
  SERMONS,
  STAFF_PASTOR,
  sermonPublishedAt,
} from "./realContent";
import { seedMinistryPages } from "./ministries";
import { seedTestimonies } from "./testimonies";

/** Seed real Lake Shore Church content via Sanity write API. */
export async function seedSanityContent(): Promise<void> {
  const client = getSanityWriteClient();

  await client.createOrReplace(REAL_SITE_CONFIG);

  await client.createOrReplace({
    _id: STAFF_PASTOR._id,
    _type: "staffBio",
    name: STAFF_PASTOR.name,
    slug: { _type: "slug", current: STAFF_PASTOR.slug },
    role: STAFF_PASTOR.role,
    bio: STAFF_PASTOR.bio,
    sortOrder: 0,
  });

  for (const series of SERIES) {
    await client.createOrReplace({
      _id: series._id,
      _type: "sermonSeries",
      title: series.title,
      slug: { _type: "slug", current: series.slug },
      description: series.description,
      themeColor: series.themeColor,
    });
  }

  for (const sermon of SERMONS) {
    await client.createOrReplace({
      _id: sermon._id,
      _type: "sermon",
      title: sermon.title,
      slug: { _type: "slug", current: sermon.slug },
      summary: sermon.excerpt,
      scripture: sermon.scripture,
      publishedAt: sermonPublishedAt(sermon.date),
      series: { _type: "reference", _ref: sermon.seriesId },
      pastor: { _type: "reference", _ref: STAFF_PASTOR._id },
    });
  }

  for (const post of BLOG_POSTS) {
    await client.createOrReplace({
      _id: post._id,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      content: paragraphsToBlocks([...post.paragraphs]),
      publishedAt: sermonPublishedAt(post.date),
      author: { _type: "reference", _ref: STAFF_PASTOR._id },
    });
  }

  await client.createOrReplace({
    _id: RESOURCE_BOOK._id,
    _type: "resource",
    title: RESOURCE_BOOK.title,
    slug: { _type: "slug", current: RESOURCE_BOOK.slug },
    description: RESOURCE_BOOK.description,
    type: RESOURCE_BOOK.type,
    externalUrl: RESOURCE_BOOK.externalUrl,
    isPublic: RESOURCE_BOOK.isPublic,
  });

  await client.createOrReplace({
    _id: "page-about",
    _type: "page",
    title: "About Lake Shore Church",
    slug: { _type: "slug", current: "about" },
    pageType: "about",
    body: paragraphsToBlocks([
      "Lake Shore Church is a community of believers meeting in Chicago's West Loop neighbourhood. We are an Assemblies of God church committed to scripture-based teaching, authentic worship, and genuine community.",
      "We meet every Sunday at 10:00 AM at Merit School of Music, 38 S. Peoria St, 2nd floor, room 210, Chicago IL 60607.",
      "Our pastor is Craig Brian Larson (Pastor Brian), a published author and expository Bible teacher who has served Lake Shore Church for many years.",
    ]),
    seoTitle: "About Us | Lake Shore Church",
    seoDescription:
      "Learn about Lake Shore Church — a Jesus-centred Assemblies of God community in Chicago's West Loop.",
  });

  await client.createOrReplace({
    _id: "page-beliefs",
    _type: "page",
    title: "What We Believe",
    slug: { _type: "slug", current: "beliefs" },
    pageType: "beliefs",
    body: paragraphsToBlocks([
      "We believe the Bible is the inspired, inerrant Word of God — our ultimate authority for faith and life.",
      "We believe in one God — Father, Son, and Holy Spirit.",
      "We believe Jesus Christ is the Son of God, who died for our sins and rose bodily from the dead.",
      "God raised Jesus from the dead. There is hope for all who follow him.",
      "We believe salvation is by grace alone, through faith alone, in Christ alone.",
      "We believe the church is called to make disciples of all nations, beginning in our own neighbourhood — the West Loop of Chicago.",
    ]),
    seoTitle: "What We Believe | Lake Shore Church",
    seoDescription:
      "Find inerrant truth from Scripture in a world of confusion — the statement of faith of Lake Shore Church.",
  });

  await seedMinistryPages();
  await seedTestimonies();
}
