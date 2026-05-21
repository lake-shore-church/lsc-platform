import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { getLocale } from "next-intl/server";
import { getSiteConfig, buildChurchJsonLd, type ThemeId } from "@repo/cms";
import { ThemeScript } from "@repo/ui/web/ThemeScript";
import { ThemeSwitcher } from "@repo/ui/web/ThemeSwitcher";
import { JsonLd } from "@/components/seo/JsonLd";
import { localeLabels, type AppLocale } from "@/i18n/routing";
import { buildHreflangLanguages } from "@/lib/i18n/metadata";
import { SITE_URL } from "@/lib/site";
import "@repo/ui/web/tokens/themes.css";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lake Shore Church — West Loop",
    template: "%s | Lake Shore Church",
  },
  description:
    "Lake Shore Church meets every Sunday at 10 AM in Chicago's West Loop. Join Pastor Brian for scripture-based teaching, community, and hope.",
  alternates: buildHreflangLanguages(),
  metadataBase: new URL(SITE_URL),
};

function resolveCmsTheme(activeTheme?: string): ThemeId {
  if (activeTheme === "default") return "bold";
  if (
    activeTheme === "bold" ||
    activeTheme === "advent" ||
    activeTheme === "easter" ||
    activeTheme === "warm"
  ) {
    return activeTheme;
  }
  return "bold";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await getLocale()) as AppLocale;
  const config = await getSiteConfig();
  const cmsTheme = resolveCmsTheme(config.activeTheme);
  const churchJsonLd = buildChurchJsonLd(config, SITE_URL);
  const htmlLang = localeLabels[locale]?.htmlLang ?? "en";

  return (
    <html
      lang={htmlLang}
      data-theme={cmsTheme}
      data-mode="dark"
      suppressHydrationWarning
      className={`${fraunces.variable} ${sourceSans.variable}`}
    >
      <head>
        <ThemeScript />
        <JsonLd data={churchJsonLd} />
      </head>
      <body>
        {children}
        <ThemeSwitcher cmsDefaultTheme={cmsTheme} />
      </body>
    </html>
  );
}
