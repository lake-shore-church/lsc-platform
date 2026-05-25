import { PASTOR_MEDIA } from "@/lib/pastorMedia";

type Props = {
  heading: string;
  intro: string;
  blogTitle: string;
  blogDesc: string;
  podcastTitle: string;
  podcastDesc: string;
  blogCta: string;
  podcastCta: string;
};

export function PastorTeachingLinks({
  heading,
  intro,
  blogTitle,
  blogDesc,
  podcastTitle,
  podcastDesc,
  blogCta,
  podcastCta,
}: Props) {
  return (
    <section className="mt-14 scroll-mt-24" aria-labelledby="pastor-teaching-heading">
      <h2
        id="pastor-teaching-heading"
        className="font-display text-h2 text-brand-primary"
      >
        {heading}
      </h2>
      <p className="mt-3 text-base leading-relaxed text-foreground-secondary">{intro}</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <article className="rounded-card border border-default bg-surface p-6">
          <h3 className="font-display text-h3 text-brand-primary">{blogTitle}</h3>
          <p className="mt-2 text-base text-foreground-secondary">{blogDesc}</p>
          <a
            href={PASTOR_MEDIA.blog.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover mt-4 inline-block font-semibold text-brand-primary"
          >
            {blogCta}
          </a>
        </article>
        <article className="rounded-card border border-default bg-surface p-6">
          <h3 className="font-display text-h3 text-brand-primary">{podcastTitle}</h3>
          <p className="mt-2 text-base text-foreground-secondary">{podcastDesc}</p>
          <a
            href={PASTOR_MEDIA.podcast.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-hover mt-4 inline-block font-semibold text-brand-primary"
          >
            {podcastCta}
          </a>
        </article>
      </div>
    </section>
  );
}
