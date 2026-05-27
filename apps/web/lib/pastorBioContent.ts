/** Public path (apps/web/public/church). Source: craigbrianlarson.com/about */
export const PASTOR_PHOTO_SRC = "/church/pastor-brian.jpg";

export const PASTOR_AMAZON_AUTHOR = "https://www.amazon.com/author/craigbrianlarson";
export const PASTOR_BOOK_KNOW =
  "https://www.amazon.com/s?k=Craig+Brian+Larson+Know";

export type PublishedWork = {
  title: string;
  detail?: string;
};

/** Biography adapted from Pastor Brian’s author site for Lake Shore Church. */
export const pastorBioContent = {
  name: "Craig Brian Larson",
  displayName: "Pastor Brian",
  role: "Lead Pastor · Lake Shore Church, West Loop Chicago",
  paragraphs: [
    "Pastor Brian uses his middle name in everyday ministry. He loves the Lord supremely — because God is infinitely superior in every imaginable way. He cherishes his family, is energized by pastoring and preaching God’s Word, and is called to both. He enjoys writing as hard but satisfying work, likes to think (writing helps), and relaxes with classical music.",
    "He has published many books and articles and served in editorial roles for Christianity Today’s Leadership Journal and PreachingToday.com for fifteen years. He holds a master’s degree in theology from Wheaton Graduate School and a bachelor’s from Illinois State University.",
    "Pastor Brian has served Lake Shore Church in downtown Chicago since 1995 and previously served three other churches. He and his wife Nancy have four grown sons, four daughters-in-law, and six grandchildren.",
    "His writing has focused on perseverance, preaching, and sermon illustrations. As editor of Christianity Today’s preaching resources, he read and listened to thousands of sermons by outstanding preachers from many backgrounds — a rich, balanced perspective he brings to Sunday teaching.",
  ],
  publishedWorks: [
    {
      title: "Preaching That Connects",
      detail: "co-author · Zondervan",
    },
    {
      title: "The Art and Craft of Biblical Preaching",
      detail: "co-general editor · Zondervan",
    },
    {
      title: "Running the Midnight Marathon",
      detail: "also published as Hang in There…to the Better End · Revell / Spire",
    },
    {
      title: "The Preacher’s Toolbox",
      detail: "general editor · six volumes · Hendrickson",
    },
    {
      title: "Sermon illustration collections",
      detail: "author or editor · Baker, Zondervan, Tyndale",
    },
    {
      title: "Pastoral Grit",
      detail: "also published as Staying Power · Bethany House / Baker",
    },
    {
      title: "Know — Gaining Wisdom from God About Everything",
      detail: "available on Amazon",
    },
    { title: "Over 100 articles in Christian magazines" },
  ] satisfies PublishedWork[],
  externalLinks: [
    {
      label: "Author website — Knowing God and His Ways",
      href: "https://craigbrianlarson.com/about/",
    },
    {
      label: "Amazon author page",
      href: PASTOR_AMAZON_AUTHOR,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/craigbrianlarson",
    },
  ],
} as const;
