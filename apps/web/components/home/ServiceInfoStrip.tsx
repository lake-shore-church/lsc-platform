import Link from "next/link";
import { Container } from "@/components/ui/Container";

const CARDS = [
  {
    icon: "📍",
    label: "Where we meet",
    lines: [
      "Merit School of Music",
      "38 S. Peoria St, 2nd floor",
      "Chicago, IL 60607",
    ],
    href: "https://maps.google.com/?q=Merit+School+of+Music+38+S+Peoria+St+Chicago",
    linkLabel: "Get directions →",
    external: true,
  },
  {
    icon: "🕙",
    label: "Service time",
    lines: ["Every Sunday", "10:00 AM", "Doors open 9:30 AM"],
    href: "/visit",
    linkLabel: "Plan your visit →",
  },
  {
    icon: "📺",
    label: "Watch online",
    lines: ["Miss a service?", "Watch our sermon archive"],
    href: "/sermons",
    linkLabel: "Watch now →",
  },
  {
    icon: "🙏",
    label: "Prayer",
    lines: ["Submit a prayer request.", "We pray for every one."],
    href: "/prayer",
    linkLabel: "Request prayer →",
  },
] as const;

export function ServiceInfoStrip() {
  return (
    <section className="border-b border-default bg-surface py-10">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card) => (
            <article
              key={card.label}
              className="rounded-card border border-default bg-background p-5 shadow-card"
            >
              <p className="text-label text-brand-accent">
                <span aria-hidden>{card.icon}</span> {card.label.toUpperCase()}
              </p>
              <div className="mt-3 space-y-0.5 text-base text-foreground-primary">
                {card.lines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <Link
                href={card.href}
                className="link-hover mt-4 inline-block text-base font-semibold text-brand-primary"
                {...("external" in card && card.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {card.linkLabel}
              </Link>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
