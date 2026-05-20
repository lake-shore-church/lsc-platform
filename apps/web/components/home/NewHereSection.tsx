import Image from "next/image";
import Link from "next/link";
import type { SiteConfig } from "@repo/cms";
import { Container } from "@/components/ui/Container";

const COMMUNITY_IMAGE =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80";

export function NewHereSection({ config: _config }: { config: SiteConfig }) {
  return (
    <section className="section-pad bg-background">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-h2 text-brand-primary">We&apos;d love to meet you</h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              Lake Shore Church is a community of believers meeting in Chicago&apos;s West Loop. We
              are a scripture-teaching, Jesus-following, community-building church. Everyone is
              welcome — wherever you are on your journey of faith.
            </p>
            <Link
              href="/visit"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-card bg-brand-primary px-6 text-base font-semibold text-white hover:opacity-90"
            >
              Plan a Visit →
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
            <Image
              src={COMMUNITY_IMAGE}
              alt="People gathered in community"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
