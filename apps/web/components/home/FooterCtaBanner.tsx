import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export async function FooterCtaBanner() {
  const t = await getTranslations("home");

  return (
    <section className="bg-[#1B4F8A] py-16 text-white">
      <Container className="text-center">
        <h2 className="font-display text-h2">{t("ready_next_step")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-white/90">{t("join_this_sunday")}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/visit"
            className="inline-flex min-h-[48px] items-center rounded-card bg-brand-accent px-8 text-base font-semibold text-white hover:opacity-90"
          >
            {t("plan_visit")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[48px] items-center rounded-card border-2 border-white px-8 text-base font-semibold text-white hover:bg-white/10"
          >
            {t("contact_us")}
          </Link>
        </div>
      </Container>
    </section>
  );
}
