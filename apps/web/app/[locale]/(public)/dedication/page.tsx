import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

const CHURCH_FINDER_URL = "https://ag.org/Find-a-Church";
const BIBLE_GATEWAY_JOHN_URL =
  "https://www.biblegateway.com/passage/?search=John+1&version=NIV";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dedication");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function DedicationPage() {
  const t = await getTranslations("dedication");

  const scriptures = [t("scripture_1"), t("scripture_2"), t("scripture_3")];

  const nextSteps = [
    {
      title: t("step_church_title"),
      body: t("step_church_body"),
      links: [
        { href: "/visit" as const, label: t("step_church_visit"), external: false },
        {
          href: CHURCH_FINDER_URL,
          label: t("step_church_finder"),
          external: true,
        },
      ],
    },
    {
      title: t("step_bible_title"),
      body: t("step_bible_body"),
      links: [
        {
          href: BIBLE_GATEWAY_JOHN_URL,
          label: t("step_bible_link"),
          external: true,
        },
      ],
    },
    {
      title: t("step_prayer_title"),
      body: t("step_prayer_body"),
      links: [
        { href: "/prayer" as const, label: t("step_prayer_link"), external: false },
      ],
    },
  ];

  return (
    <>
      <PageHeader title={t("page_title")} description={t("page_desc")} />
      <Container className="max-w-3xl py-12">
        <p className="font-display text-h3 text-brand-primary">{t("to_jesus_title")}</p>
        <p className="mt-6 text-base leading-relaxed text-foreground-secondary">{t("opening")}</p>

        <section className="mt-12 rounded-card border border-brand-accent/30 bg-brand-primary/5 p-6 sm:p-8">
          <h2 className="font-display text-h2 text-brand-primary">{t("holy_spirit_heading")}</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-primary">
            {t("holy_spirit_body")}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-h2 text-brand-primary">{t("steward_heading")}</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
            {t("steward_body")}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-h2 text-brand-primary">{t("built_heading")}</h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-secondary">{t("built_body")}</p>
        </section>

        <section className="mt-12 rounded-card border border-default bg-surface p-6 sm:p-8">
          <h2 className="font-display text-h2 text-brand-primary">{t("salvation_heading")}</h2>
          <p className="mt-3 text-base text-foreground-secondary">{t("salvation_intro")}</p>
          <blockquote className="mt-6 border-l-4 border-brand-accent pl-5 text-base italic leading-relaxed text-foreground-primary">
            {t("salvation_prayer")}
          </blockquote>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-h2 text-brand-primary">{t("next_steps_heading")}</h2>
          <p className="mt-3 text-base text-foreground-secondary">{t("next_steps_intro")}</p>
          <ol className="mt-8 space-y-8">
            {nextSteps.map((step, index) => (
              <li key={step.title}>
                <h3 className="font-display text-h3 text-brand-primary">
                  {index + 1}. {step.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-foreground-secondary">
                  {step.body}
                </p>
                <ul className="mt-3 space-y-2">
                  {step.links.map((link) => (
                    <li key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          className="font-semibold text-brand-primary hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label} →
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="font-semibold text-brand-primary hover:underline"
                        >
                          {link.label} →
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-10 border-l-4 border-brand-accent pl-5">
          <h2 className="font-display text-h3 text-brand-primary">{t("scripture_heading")}</h2>
          <ul className="mt-4 space-y-3">
            {scriptures.map((verse) => (
              <li key={verse} className="text-base italic leading-relaxed text-foreground-secondary">
                {verse}
              </li>
            ))}
          </ul>
        </section>

        <p className="mt-12 text-center font-display text-h3 text-brand-accent">{t("closing")}</p>
        <p className="mt-4 text-center text-sm text-foreground-muted">{t("platform_note")}</p>
      </Container>
    </>
  );
}
