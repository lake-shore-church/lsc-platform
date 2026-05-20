import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@repo/ui/web/images";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center">
      <Image
        src={IMAGES.hero}
        alt="Chicago skyline"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 hero-overlay" aria-hidden />
      <Container className="relative z-10 py-20">
        <h1 className="font-display text-h1 text-balance text-white">
          God raised Jesus from the dead.
        </h1>
        <h2 className="mt-4 max-w-2xl font-display text-h2 font-medium text-white/90">
          There is hope for all who follow him.
        </h2>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/visit"
            className="inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-8 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            Join us Sunday
          </Link>
          <Link
            href="/sermons"
            className="inline-flex min-h-[48px] items-center rounded-card border-2 border-white bg-transparent px-8 text-sm font-bold text-white transition-colors hover:bg-white/15"
          >
            Watch a Sermon
          </Link>
        </div>
      </Container>
    </section>
  );
}
