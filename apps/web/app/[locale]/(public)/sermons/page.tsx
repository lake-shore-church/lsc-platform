import type { Metadata } from "next";
import { getSermons, getSeriesList } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SermonArchiveClient } from "@/components/sermons/SermonArchiveClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch and listen to sermons from Lake Shore Church West Loop.",
  alternates: { canonical: `${SITE_URL}/sermons` },
};

export default async function SermonsPage() {
  const [sermons, series] = await Promise.all([
    getSermons().catch(() => []),
    getSeriesList().catch(() => []),
  ]);

  return (
    <>
      <PageHeader title="Sermons" description="Messages from God's Word." />
      <Container className="py-12">
        <p className="mb-6 text-sm">
          <a href="/api/sermons/rss" className="font-semibold text-brand-primary hover:underline">
            Subscribe via podcast RSS
          </a>
          <span className="text-foreground-muted"> (feed coming soon)</span>
        </p>
        <SermonArchiveClient sermons={sermons} series={series} />
      </Container>
    </>
  );
}
