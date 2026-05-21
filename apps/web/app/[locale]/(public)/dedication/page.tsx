import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("dedication");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function DedicationPage() {
  const t = await getTranslations("dedication");

  const scriptures = [t("scripture_1"), t("scripture_2"), t("scripture_3")];

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
