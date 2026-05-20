import type { Metadata } from "next";
import { getPage } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PortableText } from "@/components/content/PortableText";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "What We Believe",
  description: "Statement of faith and core beliefs at Lake Shore Church West Loop.",
};

export default async function BeliefsPage() {
  const page = await getPage("beliefs").catch(() => null);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does Lake Shore Church believe?",
        acceptedAnswer: {
          "@type": "Answer",
          text: page?.seoDescription ?? "Gospel-centered Christian faith in Chicago's West Loop.",
        },
      },
    ],
    url: `${SITE_URL}/beliefs`,
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHeader title="What we believe" description="Our statement of faith." />
      <Container className="py-12 max-w-3xl">
        <PortableText value={page?.body} />
      </Container>
    </>
  );
}
