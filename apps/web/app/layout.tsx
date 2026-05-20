import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSiteConfig, buildChurchJsonLd, type ThemeId } from "@repo/cms";
import { ThemeScript } from "@repo/ui/web/ThemeScript";
import { ThemeSwitcher } from "@repo/ui/web/ThemeSwitcher";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/site";
import "@repo/ui/web/tokens/themes.css";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lake Shore Church — West Loop",
    template: "%s | Lake Shore Church",
  },
  description:
    "Lake Shore Church meets every Sunday at 10 AM in Chicago's West Loop. Join Pastor Brian for scripture-based teaching, community, and hope.",
};

function resolveCmsTheme(activeTheme?: string): ThemeId {
  if (activeTheme === "advent" || activeTheme === "easter") return activeTheme;
  return "default";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSiteConfig();
  const cmsTheme = resolveCmsTheme(config.activeTheme);
  const churchJsonLd = buildChurchJsonLd(config, SITE_URL);

  return (
    <html
      lang="en"
      data-theme={cmsTheme}
      data-mode="light"
      suppressHydrationWarning
      className={inter.variable}
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
