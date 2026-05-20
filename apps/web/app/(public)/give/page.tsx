import type { Metadata } from "next";
import { getSiteConfig } from "@repo/cms";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { GiveQr } from "@/components/give/GiveQr";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Give",
  description: "Support the ministry of Lake Shore Church through generous giving.",
};

const funds = [
  { id: "general", name: "General fund", desc: "Supports day-to-day ministry and operations." },
  { id: "building", name: "Building fund", desc: "Facility and capital needs." },
  { id: "missions", name: "Missions", desc: "Local and global gospel partnerships." },
];

export default async function GivePage() {
  const config = await getSiteConfig();
  const zeffyUrl = config.zeffyEmbedUrl?.trim();

  return (
    <>
      <PageHeader title="Give" description="Thank you for your generous support." />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {funds.map((f) => (
            <div key={f.id} className="rounded-xl border border-default bg-surface p-5">
              <h2 className="font-semibold text-brand-primary">{f.name}</h2>
              <p className="mt-2 text-sm text-foreground-secondary">{f.desc}</p>
            </div>
          ))}
        </div>

        {zeffyUrl ? (
          <div className="mt-10 overflow-hidden rounded-xl border border-default">
            <iframe
              title="Give via Zeffy"
              src={zeffyUrl}
              className="min-h-[600px] w-full"
              loading="lazy"
            />
          </div>
        ) : (
          <p className="mt-10 rounded-xl border border-default bg-surface p-6 text-foreground-secondary">
            Online giving via Zeffy will be available soon. Use the QR code below or contact the church office.
          </p>
        )}

        <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <GiveQr url={`${SITE_URL}/give`} />
          {config?.paypalGivingEnabled ? (
            <a
              href="https://www.paypal.com/donate"
              className="inline-flex min-h-[44px] items-center rounded-lg bg-brand-primary px-6 font-semibold text-white hover:bg-brand-primary-hover"
              target="_blank"
              rel="noopener noreferrer"
            >
              Give via PayPal Giving Fund
            </a>
          ) : null}
        </div>
      </Container>
    </>
  );
}
