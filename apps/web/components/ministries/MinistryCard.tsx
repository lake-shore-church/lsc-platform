import type { MinistryPage } from "@repo/cms";
import { TextLink } from "@/components/ui/TextLink";
import { ministryHref } from "@/lib/ministryLinks";
import { MINISTRY_CATEGORY_LABELS } from "@/lib/ministryCategories";

export function MinistryCard({
  ministry,
  learnMoreLabel = "Learn more",
}: {
  ministry: MinistryPage;
  learnMoreLabel?: string;
}) {
  const href = ministryHref(ministry);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-default bg-background shadow-card transition-shadow hover:shadow-lg">
      {ministry.heroImageUrl ? (
        <div className="relative aspect-[16/9] bg-surface-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ministry.heroImageUrl}
            alt={ministry.imageAlt ?? ministry.title}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] bg-gradient-to-br from-brand-primary/15 to-brand-accent/15" />
      )}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-label text-brand-accent">
          {MINISTRY_CATEGORY_LABELS[ministry.category]}
        </p>
        <h3 className="mt-1 font-display text-h3 text-brand-primary">{ministry.title}</h3>
        {ministry.summary ? (
          <p className="mt-2 flex-1 text-base text-foreground-secondary line-clamp-3">
            {ministry.summary}
          </p>
        ) : null}
        <TextLink href={href} className="mt-4 inline-block">
          {learnMoreLabel}
        </TextLink>
      </div>
    </article>
  );
}
