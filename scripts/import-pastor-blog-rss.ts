/**
 * Import Pastor Brian's WordPress RSS posts into Sanity blogPost docs.
 *
 * Dry-run (default):
 *   pnpm import:pastor-blog-rss
 *
 * Apply writes to Sanity:
 *   pnpm import:pastor-blog-rss -- --apply
 *
 * Optional args:
 *   --feed=https://craigbrianlarson.com/feed/
 *   --limit=20
 */
import "./load-env-local";
import { paragraphsToBlocks } from "../packages/cms/seed/portableText";
import { getSanityWriteClient } from "../packages/cms/client";

const DEFAULT_FEED = "https://craigbrianlarson.com/feed/";

type RssItem = {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  content?: string;
};

function arg(name: string): string | undefined {
  const prefix = `--${name}=`;
  return process.argv.find((a) => a.startsWith(prefix))?.slice(prefix.length);
}

function hasFlag(flag: string): boolean {
  return process.argv.includes(`--${flag}`);
}

function decodeEntities(input: string): string {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x2019;/gi, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#x2014;/gi, "-")
    .replace(/&#8212;/g, "-");
}

function stripTags(input: string): string {
  return decodeEntities(input)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function readTag(block: string, tag: string): string | undefined {
  const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i"));
  if (cdata?.[1]) return cdata[1].trim();
  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  if (!plain?.[1]) return undefined;
  return plain[1].trim();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

function parseRss(xml: string): RssItem[] {
  const items: RssItem[] = [];
  const matches = xml.matchAll(/<item>([\s\S]*?)<\/item>/gi);

  for (const m of matches) {
    const block = m[1] ?? "";
    const titleRaw = readTag(block, "title");
    const linkRaw = readTag(block, "link");
    if (!titleRaw || !linkRaw) continue;

    items.push({
      title: decodeEntities(titleRaw),
      link: decodeEntities(linkRaw),
      pubDate: readTag(block, "pubDate"),
      description: readTag(block, "description"),
      content: readTag(block, "content:encoded") ?? readTag(block, "content"),
    });
  }

  return items;
}

function excerptFrom(item: RssItem): string {
  const raw = item.description ?? item.content ?? "";
  return stripTags(raw).slice(0, 220);
}

async function main() {
  const feed = arg("feed") ?? process.env.WORDPRESS_RSS_URL ?? DEFAULT_FEED;
  const limit = Number(arg("limit") ?? 15);
  const apply = hasFlag("apply");

  console.log(`Fetching RSS: ${feed}`);
  const res = await fetch(feed);
  if (!res.ok) {
    throw new Error(`RSS fetch failed: ${res.status} ${res.statusText}`);
  }

  const xml = await res.text();
  const parsed = parseRss(xml);
  if (!parsed.length) {
    throw new Error("No <item> entries found in RSS feed.");
  }

  const items = parsed.slice(0, Math.max(1, limit));
  const client = getSanityWriteClient();

  let created = 0;
  let updated = 0;

  console.log(`\n${apply ? "APPLY" : "DRY-RUN"}: processing ${items.length} posts...\n`);

  for (const item of items) {
    const slug = slugify(item.title);
    if (!slug) continue;

    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "blogPost" && slug.current == $slug][0]{ _id }`,
      { slug },
    );

    const summary = excerptFrom(item);
    const bodyParagraphs = [summary || item.title, `Source: ${item.link}`].filter(Boolean);

    const payload = {
      _type: "blogPost",
      title: item.title,
      slug: { _type: "slug", current: slug },
      excerpt: summary,
      content: paragraphsToBlocks(bodyParagraphs),
      publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString(),
    };

    const action = existing ? "update" : "create";
    console.log(`${action.toUpperCase()}  ${slug}  ->  ${item.title}`);

    if (!apply) continue;

    if (existing) {
      await client.patch(existing._id).set(payload).commit();
      updated += 1;
    } else {
      await client.create({ _id: `blogPost-rss-${slug}`, ...payload });
      created += 1;
    }
  }

  if (apply) {
    console.log(`\nDone. created=${created}, updated=${updated}`);
  } else {
    console.log("\nDry-run complete. Re-run with -- --apply to write to Sanity.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
