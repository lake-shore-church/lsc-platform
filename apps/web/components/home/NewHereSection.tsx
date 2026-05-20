import Image from "next/image";
import Link from "next/link";
import type { SiteConfig } from "@repo/cms";
import { formatSiteAddress } from "@repo/cms";
import { IMAGES } from "@repo/ui/web/images";
import { Container } from "@/components/ui/Container";

export function NewHereSection({ config }: { config: SiteConfig }) {
  const address = formatSiteAddress(config);

  return (
    <section className="section-pad bg-background">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-h2 leading-heading text-brand-primary">
            We&apos;d love to meet you
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-foreground-secondary">
            Lake Shore Church is a community of people following Jesus together in
            Chicago&apos;s West Loop. Everyone is welcome — wherever you are on your
            journey.
          </p>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-foreground-muted">
            {address}
            {config.phone ? `\n${config.phone}` : ""}
          </p>
          <Link
            href="/visit"
            className="mt-8 inline-flex min-h-[48px] items-center rounded-card bg-brand-primary px-8 text-base font-semibold text-white hover:bg-brand-primary-hover"
          >
            Plan a Visit
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
          <Image
            src={IMAGES.community}
            alt="Congregation worshipping together"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </Container>
    </section>
  );
}
