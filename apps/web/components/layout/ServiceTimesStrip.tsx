import type { SiteConfig } from "@repo/cms";
import { formatServiceStrip } from "@repo/cms";
import { Container } from "@/components/ui/Container";

export function ServiceTimesStrip({ config }: { config: SiteConfig }) {
  const line = formatServiceStrip(config);
  const phone = config.phone;

  return (
    <div className="border-b border-default bg-surface py-2.5 text-center text-sm text-foreground-secondary">
      <Container>
        <p>{line}</p>
        {phone ? (
          <p className="mt-0.5 text-foreground-muted">
            Call or text:{" "}
            <a href={`tel:${phone.replace(/\D/g, "")}`} className="font-medium text-brand-primary hover:underline">
              {phone}
            </a>
          </p>
        ) : null}
      </Container>
    </div>
  );
}
