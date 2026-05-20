import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@repo/ui/web/images";
import { Container } from "@/components/ui/Container";

export function HeroSection({ serviceTimesLine }: { serviceTimesLine: string }) {
  return (
    <section className="relative flex min-h-[88svh] items-center">
      <Image
        src={IMAGES.heroBase}
        alt="White dove representing peace and the Holy Spirit"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <Image
        src={IMAGES.heroAccent}
        alt=""
        fill
        priority
        className="object-cover object-center mix-blend-overlay opacity-30"
        sizes="100vw"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70"
        aria-hidden
      />
      <Container className="relative z-10 py-16 sm:py-20">
        <p className="text-base font-semibold text-white/90">{serviceTimesLine}</p>
        <h1 className="mt-4 font-display text-h1 text-balance leading-heading text-white">
          God raised Jesus from the dead.
        </h1>
        <h2 className="mt-5 max-w-2xl font-display text-h2 font-normal leading-snug text-white/90">
          There is hope for all who follow him.
        </h2>
        <div className="mt-10">
          <Link
            href="/visit"
            className="inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            Join us Sunday
          </Link>
        </div>
      </Container>
    </section>
  );
}
