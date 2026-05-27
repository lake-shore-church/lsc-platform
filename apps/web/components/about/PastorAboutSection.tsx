import Image from "next/image";
import {
  pastorBioContent,
  PASTOR_AMAZON_AUTHOR,
  PASTOR_BOOK_KNOW,
  PASTOR_PHOTO_SRC,
} from "@/lib/pastorBioContent";

type Props = {
  heading: string;
  name: string;
  worksHeading: string;
  connectHeading: string;
  bookKnowLabel: string;
  amazonLabel: string;
};

export function PastorAboutSection({
  heading,
  name,
  worksHeading,
  connectHeading,
  bookKnowLabel,
  amazonLabel,
}: Props) {
  const { displayName, role, paragraphs, publishedWorks, externalLinks } =
    pastorBioContent;

  return (
    <section id="pastor" className="mt-14 scroll-mt-24">
      <h2 className="font-display text-h2 text-brand-primary">{heading}</h2>

      <div className="mt-8 flex flex-col gap-8 sm:flex-row sm:items-start">
        <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] shrink-0 overflow-hidden rounded-card border border-default bg-surface shadow-card sm:mx-0">
          <Image
            src={PASTOR_PHOTO_SRC}
            alt={`${name} (${displayName}), Lead Pastor`}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 280px, 280px"
            priority
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-brand-accent">{name}</p>
          <p className="mt-1 text-base font-semibold text-foreground-primary">
            {displayName} · {role}
          </p>

          <div className="mt-6 space-y-4 text-base leading-relaxed text-foreground-secondary">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={PASTOR_BOOK_KNOW}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-md bg-brand-primary px-5 text-sm font-semibold text-white hover:bg-brand-primary-hover"
            >
              {bookKnowLabel}
            </a>
            <a
              href={PASTOR_AMAZON_AUTHOR}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center rounded-md border border-default px-5 text-sm font-semibold text-brand-primary hover:bg-surface"
            >
              {amazonLabel}
            </a>
          </div>
        </div>
      </div>

      <h3 className="mt-10 font-display text-h3 text-brand-primary">{worksHeading}</h3>
      <ul className="mt-4 list-disc space-y-2 pl-6 text-base text-foreground-secondary">
        {publishedWorks.map((work) => (
          <li key={work.title}>
            <span className="font-semibold text-foreground-primary">{work.title}</span>
            {work.detail ? (
              <span className="text-foreground-muted"> — {work.detail}</span>
            ) : null}
          </li>
        ))}
      </ul>

      <h3 className="mt-10 font-display text-h3 text-brand-primary">{connectHeading}</h3>
      <ul className="mt-4 space-y-2">
        {externalLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover font-semibold text-brand-primary"
            >
              {link.label} →
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
