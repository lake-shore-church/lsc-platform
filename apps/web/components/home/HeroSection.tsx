import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { homeImages } from "@repo/media";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export async function HeroSection({
  tagline,
  subTagline,
  heroBody,
}: {
  tagline?: string;
  subTagline?: string;
  heroBody?: string;
}) {
  const t = await getTranslations("home");
  const locale = await getLocale();
  const useCmsHero = locale === "en";

  return (
    <section className="relative flex min-h-[100svh] items-center">
      <Image
        src={homeImages.hero}
        alt="Chicago skyline — Lake Shore Church"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/60" aria-hidden />
      <Container className="relative z-10 py-20 text-center">
        <h1 className="font-display text-h1 text-balance leading-heading text-white">
          {useCmsHero && tagline ? tagline : t("hero_h1")}
        </h1>
        <h2 className="mx-auto mt-5 max-w-2xl font-display text-h2 font-normal leading-snug text-white/90">
          {useCmsHero && subTagline ? subTagline : t("hero_h2")}
        </h2>
        <p className="mt-4 text-lg font-semibold text-white/85">
          {useCmsHero && heroBody ? heroBody : t("tagline")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/visit"
            className="inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-8 text-base font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t("join_sunday")}
          </Link>
          <Link
            href="/sermons"
            className="inline-flex min-h-[48px] items-center rounded-card border-2 border-white px-8 text-base font-semibold text-white hover:bg-white/10"
          >
            {t("watch_sermon")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
