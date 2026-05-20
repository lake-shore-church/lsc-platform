import Link from "next/link";
import type { SiteConfig } from "@repo/cms";
import { Container } from "@/components/ui/Container";

const cards = [
  {
    icon: "📍",
    title: "Where we meet",
    getBody: (c: SiteConfig) =>
      `${c.addressLine1}\n${c.addressLine2}\n${c.cityStateZip}`,
    getHref: (c: SiteConfig) =>
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        `${c.addressLine2}, ${c.cityStateZip}`,
      )}`,
    linkLabel: "Get directions →",
    external: true,
  },
  {
    icon: "🕙",
    title: "Service times",
    getBody: () => "Every Sunday\n10:00 AM",
    getHref: () => "/visit",
    linkLabel: "Plan your visit →",
    external: false,
  },
  {
    icon: "📺",
    title: "Watch online",
    getBody: () => "Miss a service? Watch\nour sermon archive",
    getHref: () => "/sermons",
    linkLabel: "Watch now →",
    external: false,
  },
  {
    icon: "🙏",
    title: "Prayer",
    getBody: () => "Submit a prayer request.\nWe pray for every one.",
    getHref: () => "/prayer",
    linkLabel: "Request prayer →",
    external: false,
  },
] as const;

export function QuickInfoStrip({ config }: { config: SiteConfig }) {
  return (
    <section className="section-pad border-b border-default bg-surface">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => {
            const href = card.getHref(config);
            const body = card.getBody(config);
            const linkClass =
              "mt-4 text-sm font-semibold text-brand-primary hover:underline";

            return (
              <article
                key={card.title}
                className="flex flex-col rounded-card border border-default bg-background p-6 shadow-card"
              >
                <p className="text-label text-brand-accent">
                  {card.icon} {card.title}
                </p>
                <p className="mt-3 flex-1 whitespace-pre-line text-sm leading-relaxed text-foreground-secondary">
                  {body}
                </p>
                {card.external ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {card.linkLabel}
                  </a>
                ) : (
                  <Link href={href} className={linkClass}>
                    {card.linkLabel}
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
