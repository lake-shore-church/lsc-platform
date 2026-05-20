import { getSiteConfig } from "@repo/cms";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { PublicHeader } from "@/components/layout/PublicHeader";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let churchName = "Lake Shore Church";
  let address: string | undefined;

  try {
    const config = await getSiteConfig();
    if (config?.churchName) churchName = config.churchName;
    address = config?.address ?? undefined;
  } catch {
    /* use defaults */
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader churchName={churchName} />
      <main className="flex-1">{children}</main>
      <PublicFooter churchName={churchName} address={address} />
    </div>
  );
}
