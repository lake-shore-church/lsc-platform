import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1920&q=80";

export function HeroSection({
  tagline,
  subTagline,
  heroBody,
}: {
  tagline?: string;
  subTagline?: string;
  heroBody?: string;
}) {
  return (
    <section className="relative flex min-h-[100svh] items-center">
      <Image
        src={HERO_IMAGE}
        alt="Chicago skyline"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      <Container className="relative z-10 py-20 text-center">
        <h1 className="font-display text-h1 text-balance leading-heading text-white">
          {tagline ?? "God raised Jesus from the dead."}
        </h1>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-h2 font-normal leading-snug text-white/90">
          {subTagline ?? "There is hope for all who follow him."}
        </h2>
        <p className="mt-4 text-lg font-semibold text-white/85">
          {heroBody ?? "Authentic Christianity Together"}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/visit"
            className="inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            Join Us Sunday
          </Link>
          <Link
            href="/sermons"
            className="inline-flex min-h-[48px] items-center rounded-card border-2 border-white px-8 text-base font-semibold text-white hover:bg-white/10"
          >
            Watch a Sermon
          </Link>
        </div>
      </Container>
    </section>
  );
}
