import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSermons, getSeriesList } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SermonArchiveClient } from "@/components/sermons/SermonArchiveClient";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("sermons");
  return {
    title: t("page_title"),
    description: t("meta_desc"),
    alternates: { canonical: `${SITE_URL}/sermons` },
  };
}

export default async function SermonsPage() {
  const t = await getTranslations("sermons");
  const [sermons, series] = await Promise.all([
    getSermons().catch(() => []),
    getSeriesList().catch(() => []),
  ]);

  return (
    <>
      <PageHeader title={t("page_title")} description={t("page_desc")} />
      <Container className="py-12">
        <p className="mb-6 text-sm">
          <a href="/podcast.xml" className="font-semibold text-brand-primary hover:underline">
            {t("podcast_rss")}
          </a>
          <span className="text-foreground-muted"> {t("podcast_note")}</span>
        </p>
        <SermonArchiveClient sermons={sermons} series={series} />
      </Container>
    </>
  );
}
