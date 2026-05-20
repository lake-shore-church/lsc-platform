import Image from "next/image";
import { Container } from "@/components/ui/Container";

const PILLARS = [
  {
    icon: "♪",
    title: "Worship",
    body: "God planned your life for His glory and pleasure.",
    image: "https://images.unsplash.com/photo-1478147427282-58a87a702b70?w=800&q=80",
  },
  {
    icon: "📖",
    title: "Grow",
    body: "God created you to become a devoted disciple of Jesus Christ.",
    image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=80",
  },
  {
    icon: "🤝",
    title: "Serve",
    body: "God gifted you to serve Him in His church and our city.",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80",
  },
] as const;

export function MinistryCards() {
  return (
    <section className="section-pad bg-surface">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {PILLARS.map((pillar) => (
            <article
              key={pillar.title}
              className="overflow-hidden rounded-card border border-default bg-background shadow-card"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={pillar.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-2xl" aria-hidden>
                  {pillar.icon}
                </p>
                <h3 className="mt-2 font-display text-h3 text-brand-primary">{pillar.title}</h3>
                <p className="mt-3 text-base text-foreground-secondary">{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
