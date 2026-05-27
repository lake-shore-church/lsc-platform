import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { PastorAboutSection } from "@/components/about/PastorAboutSection";
import { PastorTeachingLinks } from "@/components/about/PastorTeachingLinks";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");
  const tWorship = await getTranslations("worship");
  const tGrow = await getTranslations("grow");
  const tServe = await getTranslations("serve");

  const pillars = [
    { title: tWorship("title"), body: tWorship("body") },
    { title: tGrow("title"), body: tGrow("body") },
    { title: tServe("title"), body: tServe("body") },
  ];

  return (
    <>
      <PageHeader title={t("page_title")} description={t("page_desc")} />
      <Container className="max-w-3xl py-12">
        <div className="space-y-4 text-base leading-relaxed text-foreground-secondary">
          <p>{t("intro_1")}</p>
          <p className="font-semibold text-brand-primary">{t("distinctives")}</p>
          <p>{t("intro_3")}</p>
        </div>

        <h2 className="mt-14 font-display text-h2 text-brand-primary">{t("pillars_heading")}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="rounded-card border border-default bg-surface p-5"
            >
              <h3 className="font-display text-h3 text-brand-primary">{p.title}</h3>
              <p className="mt-2 text-base text-foreground-secondary">{p.body}</p>
            </article>
          ))}
        </div>

        <p className="mt-8">
          <Link href="/about/leaders" className="link-hover font-semibold text-brand-primary">
            {t("leaders_link")} →
          </Link>
        </p>

        <PastorAboutSection
          heading={t("pastor_heading")}
          name={t("pastor_name")}
          worksHeading={t("pastor_works_heading")}
          connectHeading={t("pastor_connect_heading")}
          bookKnowLabel={t("book_link")}
          amazonLabel={t("pastor_amazon_link")}
        />

        <PastorTeachingLinks
          heading={t("teaching_heading")}
          intro={t("teaching_intro")}
          blogTitle={t("blog_title")}
          blogDesc={t("blog_desc")}
          podcastTitle={t("podcast_title")}
          podcastDesc={t("podcast_desc")}
          blogCta={t("blog_cta")}
          podcastCta={t("podcast_cta")}
        />
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Church",
          name: "Lake Shore Church — West Loop",
          description: t("page_desc"),
          address: {
            "@type": "PostalAddress",
            streetAddress: "38 S. Peoria St, 2nd floor, room 210",
            addressLocality: "Chicago",
            addressRegion: "IL",
            postalCode: "60607",
          },
        }}
      />
    </>
  );
}
