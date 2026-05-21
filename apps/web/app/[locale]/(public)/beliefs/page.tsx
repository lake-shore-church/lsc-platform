import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("beliefs");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function BeliefsPage() {
  const t = await getTranslations("beliefs");

  const beliefs = [
    t("belief_1"),
    t("belief_2"),
    t("belief_3"),
    t("belief_4"),
    t("belief_5"),
    t("belief_6"),
  ];

  const faq = [
    { question: t("faq_1_q"), answer: t("faq_1_a") },
    { question: t("faq_2_q"), answer: t("faq_2_a") },
    { question: t("faq_3_q"), answer: t("faq_3_a") },
  ];

  return (
    <>
      <PageHeader title={t("page_title")} description={t("page_desc")} />
      <Container className="max-w-3xl py-12">
        <ul className="space-y-4">
          {beliefs.map((belief) => (
            <li
              key={belief}
              className="border-l-4 border-brand-accent pl-4 text-base leading-relaxed text-foreground-primary"
            >
              {belief}
            </li>
          ))}
        </ul>
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }}
      />
    </>
  );
}
