import type { SiteConfig } from "@repo/cms";
import { PublicNav } from "./PublicNav";

export function PublicHeader({ config }: { config: SiteConfig }) {
  const serviceTimesLine = `Sundays ${config.serviceTime ?? "10 AM"} · West Loop Chicago`;

  return (
    <header className="sticky top-0 z-40">
      <PublicNav churchName={config.churchName} serviceTimesLine={serviceTimesLine} />
    </header>
  );
}
