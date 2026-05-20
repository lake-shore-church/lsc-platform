import type { SiteConfig } from "@repo/cms";
import { PublicNav } from "./PublicNav";

export function PublicHeader({ config }: { config: SiteConfig }) {
  return (
    <header className="sticky top-0 z-50 bg-background">
      <PublicNav churchName={config.churchName} />
    </header>
  );
}
