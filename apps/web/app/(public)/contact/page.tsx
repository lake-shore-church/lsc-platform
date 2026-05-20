import type { Metadata } from "next";
import { getSiteConfig } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Lake Shore Church — West Loop, Chicago.",
};

export default async function ContactPage() {
  const config = await getSiteConfig().catch(() => null);
  const churchName = config?.churchName ?? "Lake Shore Church";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Church",
    name: churchName,
    url: SITE_URL,
    telephone: config?.phone,
    email: config?.email,
    address: config?.address,
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <PageHeader title="Contact us" description="We would love to hear from you." />
      <Container className="py-12 grid gap-10 lg:grid-cols-2">
        <div>
          <ContactForm />
        </div>
        <div className="text-foreground-secondary">
          {config?.phone ? <p className="mt-2"><strong>Phone:</strong> {config.phone}</p> : null}
          {config?.email ? <p className="mt-2"><strong>Email:</strong> {config.email}</p> : null}
          {config?.address ? <p className="mt-2"><strong>Address:</strong> {config.address}</p> : null}
          {config?.socialLinks?.length ? (
            <ul className="mt-6 space-y-1">
              {config.socialLinks.map((s, i) => (
                <li key={i}>
                  <a href={s.url} className="text-brand-primary hover:underline" target="_blank" rel="noopener noreferrer">
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
