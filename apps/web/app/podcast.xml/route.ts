import { getSermons } from "@repo/cms";

const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://lsc-platform-kappa.vercel.app";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatRssDate(iso?: string): string {
  if (!iso) return new Date().toUTCString();
  return new Date(iso).toUTCString();
}

export async function GET() {
  const sermons = await getSermons().catch(() => []);

  const items = sermons
    .map((sermon) => {
      const slug = sermon.slug?.current ?? sermon._id;
      const link = `${SITE_URL}/sermons/${slug}`;
      const description = escapeXml(sermon.summary ?? sermon.title);
      const enclosure = sermon.audioUrl
        ? `<enclosure url="${escapeXml(sermon.audioUrl)}" length="0" type="audio/mpeg" />`
        : "";

      return `    <item>
      <title>${escapeXml(sermon.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${formatRssDate(sermon.publishedAt)}</pubDate>
      <description>${description}</description>
      <itunes:author>Pastor Brian</itunes:author>
      <itunes:subtitle>${escapeXml(sermon.scripture ?? "Lake Shore Church")}</itunes:subtitle>
      <itunes:explicit>no</itunes:explicit>
      ${enclosure}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lake Shore Church — Sermons</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>Scripture-based teaching from Pastor Brian at Lake Shore Church, West Loop Chicago. Authentic Christianity Together.</description>
    <language>en-us</language>
    <copyright>Lake Shore Church</copyright>
    <itunes:author>Pastor Brian · Lake Shore Church</itunes:author>
    <itunes:category text="Religion &amp; Spirituality">
      <itunes:category text="Christianity" />
    </itunes:category>
    <itunes:explicit>no</itunes:explicit>
    <atom:link href="${escapeXml(`${SITE_URL}/podcast.xml`)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
