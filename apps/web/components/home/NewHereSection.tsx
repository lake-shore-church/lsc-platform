import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@repo/ui/web/images";
import { Container } from "@/components/ui/Container";

export function NewHereSection() {
  return (
    <section className="section-pad bg-background">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-h2 text-brand-primary">We&apos;d love to meet you</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground-secondary">
            Lake Shore Church is a community of people following Jesus together in
            Chicago&apos;s West Loop. Everyone is welcome — wherever you are on your
            journey.
          </p>
          <Link
            href="/visit"
            className="mt-8 inline-flex min-h-[48px] items-center rounded-card bg-brand-primary px-8 text-sm font-bold text-white hover:bg-brand-primary-hover"
          >
            Plan a Visit
          </Link>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
          <Image
            src={IMAGES.community}
            alt="Diverse group of people in community"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </Container>
    </section>
  );
}
