import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { homeImages } from "@repo/media";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export async function NewHereSection() {
  const t = await getTranslations("home");

  return (
    <section className="section-pad bg-background">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-h2 text-brand-primary">{t("new_here")}</h2>
            <p className="mt-4 text-base leading-relaxed text-foreground-secondary">
              {t("welcome_body")}
            </p>
            <Link
              href="/visit"
              className="mt-8 inline-flex min-h-[48px] items-center rounded-card bg-brand-primary px-6 text-base font-semibold text-white hover:opacity-90"
            >
              {t("plan_visit_btn")}
            </Link>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-card">
            <Image
              src={homeImages.community}
              alt="Plan a visit — Lake Shore Church"
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
