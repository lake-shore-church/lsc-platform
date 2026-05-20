import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@repo/ui/web/images";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[92svh] items-center">
      <Image
        src={IMAGES.heroBase}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <Image
        src={IMAGES.heroAccent}
        alt=""
        fill
        priority
        className="object-cover mix-blend-soft-light opacity-40"
        sizes="100vw"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/70"
        aria-hidden
      />
      <Container className="relative z-10 py-16 sm:py-20">
        <h1 className="font-display text-h1 text-balance leading-heading text-white">
          God raised Jesus from the dead.
        </h1>
        <h2 className="mt-5 max-w-2xl font-display text-h2 font-normal leading-snug text-white/90">
          There is hope for all who follow him.
        </h2>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/visit"
            className="inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Join us Sunday
          </Link>
          <Link
            href="/sermons"
            className="inline-flex min-h-[48px] items-center rounded-card border-2 border-white/90 bg-white/10 px-8 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            Watch a Sermon
          </Link>
        </div>
      </Container>
    </section>
  );
}
