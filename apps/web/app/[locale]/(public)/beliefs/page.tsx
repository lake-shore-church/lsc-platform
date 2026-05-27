import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";

const AOG_BELIEFS_URL = "https://ag.org/Beliefs";

const SECTION_KEYS = [
  "section_bible",
  "section_god",
  "section_jesus",
  "section_holy_spirit",
  "section_salvation",
  "section_church",
  "section_baptism",
  "section_communion",
  "section_second_coming",
  "section_eternal_life",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("beliefs");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function BeliefsPage() {
  const t = await getTranslations("beliefs");

  const faq = [
    { question: t("faq_1_q"), answer: t("faq_1_a") },
    { question: t("faq_2_q"), answer: t("faq_2_a") },
    { question: t("faq_3_q"), answer: t("faq_3_a") },
  ];

  return (
    <>
      <PageHeader title={t("page_title")} description={t("distinctives")} />
      <Container className="max-w-3xl py-12">
        <p className="text-base leading-relaxed text-foreground-secondary">{t("intro")}</p>

        <div className="mt-10 space-y-10">
          {SECTION_KEYS.map((key) => (
            <section key={key}>
              <h2 className="font-display text-h3 text-brand-primary">
                {t(`${key}_title`)}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-foreground-primary">
                {t(`${key}_body`)}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-12 text-base leading-relaxed text-foreground-secondary">
          {t("aog_intro")}{" "}
          <a
            href={AOG_BELIEFS_URL}
            className="link-hover font-semibold text-brand-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("aog_link")}
          </a>
          .
        </p>
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
