import type { MinistryPage } from "@repo/cms";

export function MinistryHero({
  title,
  summary,
  heroImageUrl,
  imageAlt,
}: Pick<MinistryPage, "title" | "summary" | "heroImageUrl" | "imageAlt">) {
  return (
    <div className="relative overflow-hidden border-b border-default bg-surface">
      {heroImageUrl ? (
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={heroImageUrl}
            alt={imageAlt ?? title}
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-brand-accent/10" />
      )}
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand-primary sm:text-4xl">
          {title}
        </h1>
        {summary ? (
          <p className="mt-4 max-w-2xl text-lg text-foreground-secondary">{summary}</p>
        ) : null}
      </div>
    </div>
  );
}
