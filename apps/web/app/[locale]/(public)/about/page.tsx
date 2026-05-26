import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { PastorTeachingLinks } from "@/components/about/PastorTeachingLinks";

const BOOK_URL = "https://www.amazon.com/s?k=Craig+Brian+Larson+Know";

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

        <section id="pastor" className="mt-14 scroll-mt-24">
          <h2 className="font-display text-h2 text-brand-primary">{t("pastor_heading")}</h2>
          <p className="mt-1 text-sm font-semibold text-brand-accent">{t("pastor_name")}</p>
          <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
            {t("pastor_bio")}
          </p>
          <Link
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover mt-4 inline-block font-semibold text-brand-primary"
          >
            {t("book_link")}
          </Link>
        </section>

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
