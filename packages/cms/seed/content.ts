import { getSanityWriteClient } from "../client";
import { paragraphsToBlocks } from "./portableText";

const PLACEHOLDER_VIDEO = "https://www.youtube.com/watch?v=LXbS7s2eNvY";

/** Seed sermon, pages, blog, staff, series via Sanity write API. */
export async function seedSanityContent(): Promise<void> {
  const client = getSanityWriteClient();

  await client.createOrReplace({
    _id: "siteConfig",
    _type: "siteConfig",
    churchName: "Lake Shore Church — West Loop",
    tagline: "God raised Jesus from the dead!",
    subTagline: "There is hope for all who follow him.",
    heroBody: "Our church can help you follow Jesus.",
    addressLine1: "Merit School of Music",
    addressLine2: "38 S. Peoria St, 2nd floor, room 210",
    cityStateZip: "Chicago, IL 60607",
    phone: "(312) 464-1834",
    serviceDay: "Sunday",
    serviceTime: "10:00 AM",
    pastorName: "Pastor Brian",
    zeffyEmbedUrl: "",
    paypalGivingEnabled: false,
    activeTheme: "bold",
  });

  await client.createOrReplace({
    _id: "staff-pastor-brian",
    _type: "staffBio",
    name: "Pastor Brian",
    slug: { _type: "slug", current: "pastor-brian" },
    role: "Lead Pastor",
    sortOrder: 0,
  });

  await client.createOrReplace({
    _id: "series-resurrection",
    _type: "sermonSeries",
    title: "Resurrection",
    slug: { _type: "slug", current: "resurrection" },
    description: "Messages on the resurrection of Jesus Christ.",
    themeColor: "#1B4F8A",
  });

  await client.createOrReplace({
    _id: "sermon-four-key-ways",
    _type: "sermon",
    title: "Four Key Ways Jesus Prepares Us to Do His Work",
    slug: { _type: "slug", current: "four-key-ways-jesus-prepares-us" },
    summary:
      "After the resurrection, Jesus appeared to his disciples and opened their minds to understand the scriptures. In this message, Pastor Brian unpacks four key ways Jesus prepares every believer to carry his mission forward.",
    scripture: "Luke 24:36–53",
    publishedAt: "2026-05-19T15:00:00.000Z",
    videoUrl: PLACEHOLDER_VIDEO,
    series: { _type: "reference", _ref: "series-resurrection" },
    pastor: { _type: "reference", _ref: "staff-pastor-brian" },
  });

  await client.createOrReplace({
    _id: "page-about",
    _type: "page",
    title: "About Lake Shore Church",
    slug: { _type: "slug", current: "about" },
    pageType: "about",
    body: paragraphsToBlocks([
      "Lake Shore Church is a community of believers meeting in Chicago's West Loop neighbourhood. We are a scripture-teaching, Jesus-following, community-building church. Everyone is welcome — wherever you are on your journey of faith.",
      "We meet every Sunday at 10 AM at Merit School of Music, 38 S. Peoria St, 2nd floor, room 210, Chicago IL 60607.",
      "Our pastor is Pastor Brian, who brings clear, expository teaching from God's word every Sunday.",
    ]),
    seoTitle: "About Us | Lake Shore Church",
    seoDescription:
      "Learn about Lake Shore Church — a Jesus-centred community in Chicago's West Loop.",
  });

  await client.createOrReplace({
    _id: "page-beliefs",
    _type: "page",
    title: "What We Believe",
    slug: { _type: "slug", current: "beliefs" },
    pageType: "beliefs",
    body: paragraphsToBlocks([
      "We believe the Bible is the inspired, inerrant Word of God and our ultimate authority for faith and life.",
      "We believe in one God — Father, Son, and Holy Spirit.",
      "We believe Jesus Christ is the Son of God, who died for our sins and rose bodily from the dead.",
      "We believe salvation is by grace alone, through faith alone, in Christ alone.",
      "We believe the church is called to make disciples of all nations, beginning in our own neighbourhood.",
    ]),
    seoTitle: "What We Believe | Lake Shore Church",
    seoDescription: "The statement of faith of Lake Shore Church West Loop.",
  });

  const blogBody = paragraphsToBlocks([
    "The disciples on the road to Emmaus thought hope had vanished. Then Jesus drew near, opened the Scriptures, and broke bread — and their hearts burned within them. Luke 24 reminds us that the risen Christ is not a distant memory but a present Lord.",
    "When Jesus appeared to his followers in Jerusalem, he showed them his hands and feet and ate with them. He opened their minds to understand how the Law, the Prophets, and the Psalms all pointed to him. The resurrection is not only a historical event; it reorders how we live today.",
    "In Chicago in 2026, we face the same fears and distractions as every generation. Yet the same Jesus who commissioned the eleven still sends his people into the world with repentance and forgiveness in his name.",
    "This week, read Luke 24:36–53 slowly. Ask the Lord where he is preparing you to serve, to speak, and to love your neighbour. He who rose from the dead will equip you for the work he has prepared.",
  ]);

  await client.createOrReplace({
    _id: "blog-hope-after-resurrection",
    _type: "blogPost",
    title: "Hope After the Resurrection: What Luke 24 Means for Us Today",
    slug: { _type: "slug", current: "hope-after-resurrection-luke-24" },
    excerpt:
      "The disciples saw the risen Jesus and were transformed. What does that same resurrection mean for us living in Chicago in 2026?",
    content: blogBody,
    publishedAt: new Date().toISOString(),
    author: { _type: "reference", _ref: "staff-pastor-brian" },
  });
}
