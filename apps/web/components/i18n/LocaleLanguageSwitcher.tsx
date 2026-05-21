"use client";

import { useLocale } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@repo/ui/web/LanguageSwitcher";
import { locales, localeLabels, type AppLocale } from "@/i18n/routing";
import { setLocalePreference } from "@/lib/i18n/locale-preference";

const options = locales.map((code) => ({
  code,
  label: localeLabels[code].label,
  flag: localeLabels[code].flag,
}));

export function LocaleLanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();

  return (
    <LanguageSwitcher
      locale={locale}
      options={options}
      className={className}
      onSelect={(code) => {
        const next = code as AppLocale;
        setLocalePreference(next);
        const href = getPathname({ href: pathname, locale: next });
        window.location.assign(href);
      }}
    />
  );
}
