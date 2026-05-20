import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ConnectIcon, GiveIcon, ServeIcon } from "@/components/icons/MinistryIcons";

const cards = [
  {
    title: "Connect",
    variant: "connect" as const,
    body: "Small groups and gatherings to grow in faith together.",
    href: "/events",
    cta: "Find a group",
    Icon: ConnectIcon,
  },
  {
    title: "Serve",
    variant: "serve" as const,
    body: "Use your gifts to bless the church and our city.",
    href: "/events",
    cta: "Get involved",
    Icon: ServeIcon,
  },
  {
    title: "Give",
    variant: "give" as const,
    body: "Support gospel ministry through generous giving.",
    href: "/give",
    cta: "Give now",
    Icon: GiveIcon,
  },
] as const;

export function MinistryCards() {
  return (
    <section className="section-pad bg-surface">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.Icon;
            return (
              <article
                key={card.title}
                data-ministry={card.variant}
                className="ministry-card flex flex-col rounded-card border p-6 shadow-card"
              >
                <div className="ministry-icon-wrap mb-5 inline-flex h-14 w-14 items-center justify-center rounded-card">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-h3 leading-snug text-foreground-primary">
                  {card.title}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-foreground-secondary">
                  {card.body}
                </p>
                <Link
                  href={card.href}
                  className="link-hover ministry-link mt-5 inline-flex min-h-[44px] items-center text-base font-semibold"
                >
                  {card.cta} →
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
