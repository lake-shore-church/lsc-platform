import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getSiteConfig, formatSiteAddress } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return { title: t("page_title"), description: t("meta_desc") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const config = await getSiteConfig();
  const address = formatSiteAddress(config);

  return (
    <>
      <PageHeader title={t("page_title")} description={t("page_desc")} />
      <Container className="py-12 grid gap-10 lg:grid-cols-2">
        <div>
          <ContactForm />
        </div>
        <div className="text-foreground-secondary">
          {config.phone ? (
            <p className="mt-2">
              <strong>{t("phone")}</strong>{" "}
              <a href={`tel:${config.phone.replace(/\D/g, "")}`} className="text-brand-primary hover:underline">
                {config.phone}
              </a>
            </p>
          ) : null}
          {config.email ? (
            <p className="mt-2">
              <strong>{t("email")}</strong> {config.email}
            </p>
          ) : null}
          <p className="mt-2 whitespace-pre-line">
            <strong>{t("address")}</strong>
            <br />
            {address}
          </p>
          {config.socialLinks?.length ? (
            <ul className="mt-6 space-y-1">
              {config.socialLinks.map((s, i) => (
                <li key={i}>
                  <a
                    href={s.url}
                    className="text-brand-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.platform}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
    </>
  );
}
