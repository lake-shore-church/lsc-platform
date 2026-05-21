"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { LanguageSwitcher } from "@repo/ui/web/LanguageSwitcher";
import { locales, localeLabels, type AppLocale } from "@/i18n/routing";

const STORAGE_KEY = "lsc-lang";

const options = locales.map((code) => ({
  code,
  label: localeLabels[code].label,
  flag: localeLabels[code].flag,
}));

export function LocaleLanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  return (
    <LanguageSwitcher
      locale={locale}
      options={options}
      className={className}
      onSelect={(code) => {
        localStorage.setItem(STORAGE_KEY, code);
        router.replace(pathname, { locale: code as AppLocale });
        router.refresh();
      }}
    />
  );
}
