import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@repo/ui/web/images";
import { Container } from "@/components/ui/Container";

const cards = [
  {
    title: "Connect",
    body: "Join a small group and grow in your faith with others",
    image: IMAGES.smallGroup,
    href: "/events",
    cta: "Find a group",
  },
  {
    title: "Serve",
    body: "Use your gifts to serve the congregation and the city",
    image: IMAGES.serve,
    href: "/events",
    cta: "Get involved",
  },
  {
    title: "Give",
    body: "Support the mission of Lake Shore Church generously",
    image: IMAGES.give,
    href: "/give",
    cta: "Give now",
  },
] as const;

export function MinistryCards() {
  return (
    <section className="section-pad bg-surface">
      <Container>
        <h2 className="text-center font-display text-h2 text-brand-primary">
          Discover more ways to connect
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-card border border-default bg-background shadow-card"
            >
              <div className="relative aspect-[4/3]">
                <Image src={card.image} alt="" fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-6">
                <p className="text-label text-brand-accent">{card.title}</p>
                <p className="mt-2 text-foreground-secondary">{card.body}</p>
                <Link
                  href={card.href}
                  className="mt-4 inline-flex min-h-[44px] items-center text-sm font-semibold text-brand-primary hover:underline"
                >
                  {card.cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
