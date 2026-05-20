import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSiteConfig, type ThemeId } from "@repo/cms";
import { ThemeScript } from "@repo/ui/web/ThemeScript";
import { ThemeSwitcher } from "@repo/ui/web/ThemeSwitcher";
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
    "Lake Shore Church West Loop — worship, community, and ministry in Chicago.",
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
  let cmsTheme: ThemeId = "default";
  try {
    const config = await getSiteConfig();
    cmsTheme = resolveCmsTheme(config?.activeTheme);
  } catch {
    /* Sanity unreachable — fall back to default */
  }

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
      </head>
      <body>
        {children}
        <ThemeSwitcher cmsDefaultTheme={cmsTheme} />
      </body>
    </html>
  );
}
