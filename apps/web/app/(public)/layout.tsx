import { getSiteConfig, formatSiteAddress } from "@repo/cms";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { ServiceTimesStrip } from "@/components/layout/ServiceTimesStrip";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getSiteConfig();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader churchName={config.churchName} />
      <ServiceTimesStrip config={config} />
      <main className="flex-1">{children}</main>
      <PublicFooter
        churchName={config.churchName}
        address={formatSiteAddress(config)}
        phone={config.phone}
      />
    </div>
  );
}
