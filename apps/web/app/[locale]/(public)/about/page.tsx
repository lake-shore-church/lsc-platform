import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Lake Shore Church — Authentic Christianity Together in Chicago's West Loop. Meet Pastor Brian and our community.",
};

const PILLARS = [
  {
    title: "Worship",
    body: "God planned your life for His glory and pleasure.",
  },
  {
    title: "Grow",
    body: "God created you to become a devoted disciple of Jesus Christ.",
  },
  {
    title: "Serve",
    body: "God gifted you to serve Him in His church and our city.",
  },
] as const;

const BOOK_URL = "https://www.amazon.com/s?k=Craig+Brian+Larson+Know";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Lake Shore Church"
        description="Authentic Christianity Together"
      />
      <Container className="max-w-3xl py-12">
        <div className="space-y-4 text-base leading-relaxed text-foreground-secondary">
          <p>
            Lake Shore Church is a community of believers meeting in Chicago&apos;s West Loop
            neighbourhood. We are an Assemblies of God church committed to scripture-based
            teaching, authentic worship, and genuine community.
          </p>
          <p>
            We meet every Sunday at 10:00 AM at Merit School of Music, 38 S. Peoria St, 2nd floor,
            room 210, Chicago IL 60607.
          </p>
          <p>
            Our pastor is Craig Brian Larson (Pastor Brian), a published author and expository Bible
            teacher who has served Lake Shore Church for many years.
          </p>
        </div>

        <h2 className="mt-14 font-display text-h2 text-brand-primary">Our pillars</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className="rounded-card border border-default bg-surface p-5"
            >
              <h3 className="font-display text-h3 text-brand-primary">{p.title}</h3>
              <p className="mt-2 text-base text-foreground-secondary">{p.body}</p>
            </article>
          ))}
        </div>

        <section id="pastor" className="mt-14 scroll-mt-24">
          <h2 className="font-display text-h2 text-brand-primary">Pastor Brian</h2>
          <p className="mt-1 text-sm font-semibold text-brand-accent">Craig Brian Larson</p>
          <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
            Pastor Brian is a scripture teacher, author, and pastor who brings clear expository
            preaching from God&apos;s Word every Sunday. He is the author of{" "}
            <em>Know — Gaining Wisdom from God About Everything</em> and has served the West Loop
            community for many years.
          </p>
          <Link
            href={BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover mt-4 inline-block font-semibold text-brand-primary"
          >
            Get the book on Amazon →
          </Link>
        </section>
      </Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Church",
          name: "Lake Shore Church — West Loop",
          description: "Authentic Christianity Together in Chicago's West Loop",
          address: {
            "@type": "PostalAddress",
            streetAddress: "38 S. Peoria St, 2nd floor, room 210",
            addressLocality: "Chicago",
            addressRegion: "IL",
            postalCode: "60607",
          },
        }}
      />
    </>
  );
}
