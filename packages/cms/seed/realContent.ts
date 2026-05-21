import { paragraphsToBlocks } from "./portableText";

export const REAL_SITE_CONFIG = {
  _id: "siteConfig",
  _type: "siteConfig" as const,
  churchName: "Lake Shore Church — West Loop",
  tagline: "God raised Jesus from the dead.",
  subTagline: "There is hope for all who follow him.",
  heroBody:
    "In a world of pain, death, and evil, there is hope in the Son of God.",
  heroCtaText: "Our church can help you follow Jesus.",
  distinctives:
    "Find inerrant truth from Scripture in a world of confusion.",
  serviceInvitation: "We hope to see you there!",
  addressLine1: "Merit School of Music",
  addressLine2: "38 S. Peoria St, 2nd floor, room 210",
  cityStateZip: "Chicago, IL 60607",
  phone: "(312) 464-1834",
  email: "blarson0220@yahoo.com",
  serviceDay: "Sunday",
  serviceTime: "Begins at 10 A.M.",
  pastorName: "Pastor Brian",
  serviceTimes: [{ day: "Sunday", time: "10:00 AM", note: "Doors open 9:30 AM" }],
  socialLinks: [
    {
      platform: "Facebook",
      url: "https://www.facebook.com/lschurchchicago",
    },
  ],
  activeTheme: "bold" as const,
  paypalGivingEnabled: false,
  zeffyEmbedUrl: "",
};

export const SERIES = [
  {
    _id: "series-sheer-goodness",
    title: "The Sheer Goodness of Jesus",
    slug: "sheer-goodness-of-jesus",
    description:
      "A video series exploring the sheer goodness of Jesus — his words, his power, his compassion, and what he is willing and able to do for us today.",
    themeColor: "#1B4F8A",
  },
  {
    _id: "series-sunday-sermons",
    title: "Sunday Sermons",
    slug: "sunday-sermons",
    description:
      "Weekly scripture-based teaching from Pastor Brian at Lake Shore Church, West Loop Chicago.",
    themeColor: "#0F7B6C",
  },
] as const;

type SermonSeed = {
  _id: string;
  title: string;
  slug: string;
  scripture: string;
  seriesId: string;
  date: string;
  excerpt: string;
};

export const SERMONS: SermonSeed[] = [
  {
    _id: "sermon-four-ways-jesus-prepares-us",
    title: "Four Key Ways Jesus Prepares Us to Do His Work",
    slug: "four-ways-jesus-prepares-us",
    scripture: "Luke 24:36–53",
    seriesId: "series-sunday-sermons",
    date: "2026-05-19",
    excerpt:
      "After the resurrection, Jesus appeared to his disciples and opened their minds to understand the scriptures. Pastor Brian unpacks four key ways Jesus prepares every believer to carry his mission forward.",
  },
  {
    _id: "sermon-glory-of-servanthood",
    title: "The Glory of Servanthood",
    slug: "glory-of-servanthood",
    scripture: "Luke 22:21–30",
    seriesId: "series-sunday-sermons",
    date: "2026-03-01",
    excerpt:
      "Jesus teaches that true greatness in the kingdom of God is found not in power or position but in serving others.",
  },
  {
    _id: "sermon-accountability-gods-servants",
    title: "Preparing for the Accountability That Comes to All God's Servants",
    slug: "accountability-gods-servants",
    scripture: "Luke (various)",
    seriesId: "series-sunday-sermons",
    date: "2024-10-27",
    excerpt:
      "Every servant of God will one day give an account. This sermon prepares us for that moment with wisdom and grace.",
  },
  {
    _id: "sermon-right-and-wrong-fear",
    title: "Right and Wrong Fear",
    slug: "right-and-wrong-fear",
    scripture: "Psalm 27:1",
    seriesId: "series-sunday-sermons",
    date: "2024-08-18",
    excerpt:
      "The Lord is my light and my salvation; whom shall I fear? Understanding the difference between right and wrong fear in the Christian life.",
  },
  {
    _id: "sermon-sheer-goodness-episode-12",
    title: "The Sheer Goodness of Jesus — Episode 12",
    slug: "sheer-goodness-episode-12",
    scripture: "John 15",
    seriesId: "series-sheer-goodness",
    date: "2024-11-06",
    excerpt: "The words of Jesus are sheer goodness, for they can make us fruitful.",
  },
  {
    _id: "sermon-sheer-goodness-episode-9",
    title: "The Sheer Goodness of Jesus — Episode 9",
    slug: "sheer-goodness-episode-9",
    scripture: "Luke (various)",
    seriesId: "series-sheer-goodness",
    date: "2024-08-13",
    excerpt:
      "Do you feel rejected? Jesus meets us in our rejection with sheer goodness and grace.",
  },
  {
    _id: "sermon-sheer-goodness-episode-8",
    title: "The Sheer Goodness of Jesus — Episode 8",
    slug: "sheer-goodness-episode-8",
    scripture: "Luke 5:1–11",
    seriesId: "series-sheer-goodness",
    date: "2024-07-30",
    excerpt:
      "Jesus spoke words of sheer goodness to fishermen on the shores of Galilee. Those same words speak to us today.",
  },
  {
    _id: "sermon-sheer-goodness-episode-7",
    title: "The Sheer Goodness of Jesus — Episode 7",
    slug: "sheer-goodness-episode-7",
    scripture: "Luke (various)",
    seriesId: "series-sheer-goodness",
    date: "2024-07-11",
    excerpt:
      "The good things Jesus did over 2000 years ago, he is willing and able to do today.",
  },
  {
    _id: "sermon-sheer-goodness-episode-6",
    title: "The Sheer Goodness of Jesus — Episode 6",
    slug: "sheer-goodness-episode-6",
    scripture: "Luke (various)",
    seriesId: "series-sheer-goodness",
    date: "2024-07-03",
    excerpt:
      "How to experience the sheer goodness of Jesus — healing and deliverance are available to us today.",
  },
  {
    _id: "sermon-sheer-goodness-episode-5",
    title: "The Sheer Goodness of Jesus — Episode 5",
    slug: "sheer-goodness-episode-5",
    scripture: "Luke (various)",
    seriesId: "series-sheer-goodness",
    date: "2024-06-25",
    excerpt:
      "Because Jesus is perfectly good, he can deliver us from the oppression of unclean spirits.",
  },
];

export const BLOG_POSTS = [
  {
    _id: "blog-devotional-forgiveness-of-sin",
    title: "Weekly Devotional: The Forgiveness of Sin",
    slug: "devotional-forgiveness-of-sin",
    date: "2024-08-20",
    excerpt:
      "A week of scripture on the transforming power of God's forgiveness.",
    paragraphs: [
      "Blessed is the one whose transgression is forgiven, whose sin is covered. — Psalm 32:1",
      "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness. — 1 John 1:9",
      "In Christ we have redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace. — Ephesians 1:7",
      "To Jesus Christ all the prophets bear witness that everyone who believes in him receives forgiveness of sins through his name. — Acts 10:43",
      "God's forgiveness is complete, free, and available to every person who comes to him in faith. You are not too far gone. You are not beyond his reach.",
    ],
  },
  {
    _id: "blog-devotional-goodness-of-god",
    title: "Weekly Devotional: The Goodness of God",
    slug: "devotional-goodness-of-god",
    date: "2024-08-11",
    excerpt: "Scripture meditations on the inexhaustible goodness of our God.",
    paragraphs: [
      "Every good gift and every perfect gift is from above, coming down from the Father of lights. — James 1:17",
      "The LORD is good to all, and his mercy is over all that he has made. — Psalm 145:9",
      "You, O Lord, are good and forgiving, abounding in steadfast love to all who call upon you. — Psalm 86:5",
      "God makes his sun rise on the evil and on the good, and sends rain on the just and on the unjust. — Matthew 5:45",
      "God's goodness is not occasional — it is his nature. He cannot be anything other than good to you.",
    ],
  },
  {
    _id: "blog-devotional-fatherhood-of-god",
    title: "Weekly Devotional: The Fatherhood of God",
    slug: "devotional-fatherhood-of-god",
    date: "2024-07-23",
    excerpt: "What it means to be called a child of God — seven days of scripture.",
    paragraphs: [
      "See what kind of love the Father has given to us, that we should be called children of God; and so we are. — 1 John 3:1",
      "As a father shows compassion to his children, so the LORD shows compassion to those who fear him. — Psalm 103:13",
      "Now you are no longer a slave but God's own child. And since you are his child, God has made you his heir. — Galatians 4:7",
      "Because we are his children, God has sent the Spirit of his Son into our hearts, prompting us to call out, 'Abba, Father.' — Galatians 4:6",
      "You are not an orphan. You are not alone. You have a Father in heaven who sees you, knows you, and calls you his own.",
    ],
  },
  {
    _id: "blog-devotional-prayer",
    title: "Weekly Devotional: Prayer",
    slug: "devotional-prayer",
    date: "2024-07-10",
    excerpt: "Seven scriptures on the power and practice of prayer.",
    paragraphs: [
      "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus. — Philippians 4:6–7",
      "Ask, and it will be given to you; seek, and you will find; knock, and it will be opened to you. — Matthew 7:7–8",
      "Our Father in heaven, hallowed be your name. Your kingdom come, your will be done, on earth as it is in heaven. — Matthew 6:9–10",
      "This is the confidence that we have toward him, that if we ask anything according to his will he hears us. — 1 John 5:14",
      "Prayer is not a ritual. It is a conversation with your Father. Come to him today with whatever is on your heart.",
    ],
  },
] as const;

export const RESOURCE_BOOK = {
  _id: "resource-pastor-brian-know",
  title: "Know — Gaining Wisdom from God About Everything",
  slug: "know-gaining-wisdom",
  description:
    "Pastor Brian's book designed to help you gain wisdom from God about everything in life. Available on Amazon.",
  type: "book",
  externalUrl: "https://www.amazon.com/s?k=Craig+Brian+Larson+Know",
  isPublic: true,
};

export const STAFF_PASTOR = {
  _id: "staff-pastor-brian",
  name: "Pastor Brian",
  slug: "pastor-brian",
  role: "Lead Pastor",
  bio: paragraphsToBlocks([
    "Craig Brian Larson (Pastor Brian) is a published author and expository Bible teacher who has served Lake Shore Church in Chicago's West Loop for many years.",
    "He is the author of Know — Gaining Wisdom from God About Everything.",
  ]),
};

export function sermonPublishedAt(date: string): string {
  return `${date}T15:00:00.000Z`;
}
