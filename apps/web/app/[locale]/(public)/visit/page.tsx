import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getPage, getSiteConfig, formatSiteAddress } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("visit");
  return { title: t("page_title"), description: t("page_desc") };
}

export default async function VisitPage() {
  const t = await getTranslations("visit");
  const [page, config] = await Promise.all([
    getPage("visit").catch(() => null),
    getSiteConfig(),
  ]);

  const address = formatSiteAddress(config);
  const mapQuery = encodeURIComponent(
    `${config.addressLine2 ?? ""} ${config.cityStateZip ?? "Chicago IL 60607"}`.trim(),
  );

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What should I expect on my first visit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Warm welcome, worship, biblical teaching, and community.",
        },
      },
    ],
    url: `${SITE_URL}/visit`,
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHeader title={t("title")} description={t("subtitle")} />
      <Container className="grid gap-10 py-12 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-brand-primary">{t("service_times")}</h2>
          <ul className="mt-4 space-y-2 text-foreground-secondary">
            <li>
              <strong>{config.serviceDay}</strong> — {config.serviceTime}
            </li>
            <li className="whitespace-pre-line text-sm text-foreground-muted">{address}</li>
            {config.phone ? <li>{t("call", { phone: config.phone })}</li> : null}
          </ul>
          <h2 className="mt-8 text-xl font-semibold text-brand-primary">{t("what_to_expect")}</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground-secondary">
            <li>{t("expect_1")}</li>
            <li>{t("expect_2")}</li>
            <li>{t("expect_3")}</li>
            <li>{t("expect_4")}</li>
          </ol>
          <PortableText value={page?.body} />
          <div className="mt-8">
            <Button href="/contact">{t("ask_question")}</Button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-brand-primary">{t("location")}</h2>
          <p className="mt-2 whitespace-pre-line text-foreground-secondary">{address}</p>
          <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-default">
            <iframe
              title="Church location"
              className="h-full w-full"
              loading="lazy"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            />
          </div>
          <h3 className="mt-6 font-semibold text-foreground-primary">{t("parking")}</h3>
          <p className="mt-2 text-sm text-foreground-secondary">{t("parking_desc")}</p>
        </div>
      </Container>
    </>
  );
}
