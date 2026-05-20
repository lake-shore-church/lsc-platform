import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@repo/ui/web/images";
import { Container } from "@/components/ui/Container";

const cards = [
  {
    title: "Connect",
    body: "Small groups and gatherings to grow in faith together.",
    image: IMAGES.connect,
    href: "/events",
    cta: "Find a group",
  },
  {
    title: "Serve",
    body: "Use your gifts to bless the church and our city.",
    image: IMAGES.serve,
    href: "/events",
    cta: "Get involved",
  },
  {
    title: "Give",
    body: "Support gospel ministry through generous giving.",
    image: IMAGES.give,
    href: "/give",
    cta: "Give now",
  },
] as const;

export function MinistryCards() {
  return (
    <section className="section-pad bg-surface">
      <Container>
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.title}
              className="overflow-hidden rounded-card border border-default bg-background shadow-card"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={card.image}
                  alt={
                    card.title === "Connect"
                      ? "People talking together in a small group"
                      : card.title === "Serve"
                        ? "Volunteers serving in the community"
                        : "Hands open in generous giving"
                  }
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg leading-snug text-brand-primary">
                  {card.title}
                </h3>
                <p className="mt-2 leading-relaxed text-foreground-secondary">
                  {card.body}
                </p>
                <Link
                  href={card.href}
                  className="link-hover mt-4 inline-block text-base font-semibold text-brand-accent"
                >
                  {card.cta} →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
