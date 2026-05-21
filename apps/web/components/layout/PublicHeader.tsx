import type { SiteConfig } from "@repo/cms";
import { getTranslations } from "next-intl/server";
import { LocaleLanguageSwitcher } from "@/components/i18n/LocaleLanguageSwitcher";
import { PublicNav } from "./PublicNav";

export async function PublicHeader({ config }: { config: SiteConfig }) {
  const t = await getTranslations("nav");
  const serviceTimesLine = t("service_times_strip");

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex max-w-7xl items-center justify-end gap-3 px-4 pt-2 sm:px-6 lg:px-8">
        <LocaleLanguageSwitcher />
      </div>
      <PublicNav churchName={config.churchName} serviceTimesLine={serviceTimesLine} />
    </header>
  );
}
