import type { Metadata } from "next";
import { getPage, getSiteConfig, formatSiteAddress } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Plan a Visit",
  description: "Service times, directions, parking, and what to expect at Lake Shore Church.",
};

export default async function VisitPage() {
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
      <PageHeader title="Plan a visit" description="We would love to meet you." />
      <Container className="py-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold text-brand-primary">Service times</h2>
          <ul className="mt-4 space-y-2 text-foreground-secondary">
            <li>
              <strong>{config.serviceDay}</strong> — {config.serviceTime}
            </li>
            <li className="whitespace-pre-line text-sm text-foreground-muted">{address}</li>
            {config.phone ? <li>Call or text: {config.phone}</li> : null}
          </ul>
          <h2 className="mt-8 text-xl font-semibold text-brand-primary">What to expect</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-foreground-secondary">
            <li>Arrive a few minutes early — greeters will welcome you.</li>
            <li>Join in worship and prayer with the congregation.</li>
            <li>Listen to biblical teaching from God&apos;s Word.</li>
            <li>Stay for coffee and conversation — we would love to get to know you.</li>
          </ol>
          <PortableText value={page?.body} />
          <div className="mt-8">
            <Button href="/contact">Ask a question</Button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-brand-primary">Location</h2>
          <p className="mt-2 whitespace-pre-line text-foreground-secondary">{address}</p>
          <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-default">
            <iframe
              title="Church location"
              className="h-full w-full"
              loading="lazy"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            />
          </div>
          <h3 className="mt-6 font-semibold text-foreground-primary">Parking & transport</h3>
          <p className="mt-2 text-sm text-foreground-secondary">
            Street parking and public transit are available in the West Loop. Plan extra time on Sunday mornings.
          </p>
        </div>
      </Container>
    </>
  );
}
