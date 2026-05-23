import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteConfig } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { GiveQr } from "@/components/give/GiveQr";
import { GiveTrustBadge } from "@/components/give/GiveTrustBadge";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("give");
  return { title: t("page_title"), description: t("page_desc") };
}

export default async function GivePage() {
  const t = await getTranslations("give");
  const config = await getSiteConfig();
  const zeffyUrl = config.zeffyEmbedUrl?.trim();

  const funds = [
    { id: "tithe", name: t("tithe"), desc: t("tithe_desc") },
    { id: "missions", name: t("missions"), desc: t("missions_desc") },
    { id: "building", name: t("building"), desc: t("building_desc") },
    { id: "mercy", name: t("mercy"), desc: t("mercy_desc") },
    { id: "other", name: t("other"), desc: t("other_desc") },
  ];

  return (
    <>
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {funds.map((f) => (
            <div key={f.id} className="rounded-xl border border-default bg-surface p-5">
              <h2 className="font-semibold text-brand-primary">{f.name}</h2>
              <p className="mt-2 text-sm text-foreground-secondary">{f.desc}</p>
            </div>
          ))}
        </div>

        {zeffyUrl ? (
          <div className="mt-10 overflow-hidden rounded-xl border border-default">
            <iframe
              title="Give via Zeffy"
              src={zeffyUrl}
              className="min-h-[600px] w-full"
              loading="lazy"
            />
          </div>
        ) : (
          <p className="mt-10 rounded-xl border border-default bg-surface p-6 text-foreground-secondary">
            {t("zeffy_soon")}
          </p>
        )}

        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <GiveQr url={`${SITE_URL}/give`} />
          {config?.paypalGivingEnabled ? (
            <a
              href={
                config.paypalGivingUrl?.trim() ||
                "https://www.paypal.com/us/webapps/mpp/givingfund"
              }
              className="inline-flex min-h-[44px] items-center rounded-lg bg-brand-primary px-6 font-semibold text-white hover:bg-brand-primary-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("paypal")}
            </a>
          ) : null}
        </div>
        <GiveTrustBadge churchTaxId={config.churchTaxId} />
        <p className="mt-6 text-sm text-foreground-muted">{t("zero_fees")}</p>
      </Container>
    </>
  );
}
