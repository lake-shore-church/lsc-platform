import { getSiteConfig, formatSiteAddress } from "@repo/cms";
import { LiveSiteBanner } from "@/components/live/LiveSiteBanner";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader config={config} />
      <LiveSiteBanner />
      <main className="flex-1">{children}</main>
      <PublicFooter
        churchName={config.churchName}
        address={formatSiteAddress(config)}
        phone={config.phone}
      />
    </div>
  );
}
