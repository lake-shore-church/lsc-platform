import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("faq");
  return { title: t("page_title"), description: t("page_desc") };
}

export default async function FaqPage() {
  const t = await getTranslations("faq");

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"] as const;
  const items = keys.map((n) => ({
    q: t(`q_${n}`),
    a: t(`a_${n}`),
  }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
    url: `${SITE_URL}/faq`,
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Container className="max-w-3xl py-12">
        <dl className="space-y-8">
          {items.map((item) => (
            <div key={item.q}>
              <dt className="font-display text-h3 text-brand-primary">{item.q}</dt>
              <dd className="mt-2 text-base leading-relaxed text-foreground-secondary">{item.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-12 text-foreground-secondary">
          {t("more_help")}{" "}
          <Link href="/contact" className="link-hover font-semibold text-brand-primary">
            {t("contact_link")}
          </Link>{" "}
          ·{" "}
          <Link href="/visit" className="link-hover font-semibold text-brand-primary">
            {t("visit_link")}
          </Link>
        </p>
      </Container>
    </>
  );
}
