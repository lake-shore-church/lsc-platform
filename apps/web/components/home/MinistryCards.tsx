import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { homeImages } from "@repo/media";
import { Container } from "@/components/ui/Container";

export async function MinistryCards() {
  const tWorship = await getTranslations("worship");
  const tGrow = await getTranslations("grow");
  const tServe = await getTranslations("serve");

  const pillars = [
    {
      icon: "♪",
      title: tWorship("title"),
      body: tWorship("body"),
      image: homeImages.worship,
    },
    {
      icon: "📖",
      title: tGrow("title"),
      body: tGrow("body"),
      image: homeImages.bible,
    },
    {
      icon: "🤝",
      title: tServe("title"),
      body: tServe("body"),
      image: homeImages.serve,
    },
  ] as const;

  return (
    <section className="section-pad bg-surface">
      <Container>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="overflow-hidden rounded-card border border-default bg-background shadow-card"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
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
