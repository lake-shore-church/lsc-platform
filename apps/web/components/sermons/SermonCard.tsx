import Link from "next/link";
import Image from "next/image";
import type { Sermon } from "@repo/cms";
import { formatDate } from "@/lib/format";
import { slugValue, urlFor } from "@/lib/sanity";

export function SermonCard({ sermon }: { sermon: Sermon }) {
  const slug = slugValue(sermon.slug);
  const image = sermon.featuredImage ?? sermon.series?.artwork;
  const imageUrl = image ? urlFor(image).width(640).height(360).url() : null;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-default bg-surface shadow-sm transition-shadow hover:shadow-md">
      {imageUrl ? (
        <div className="relative aspect-video bg-surface-2">
          <Image src={imageUrl} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        </div>
      ) : (
        <div className="aspect-video bg-surface-2" />
      )}
      <div className="flex flex-1 flex-col p-4">
        {sermon.series ? (
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-accent">
            {sermon.series.title}
          </span>
        ) : null}
        <h2 className="mt-1 text-lg font-semibold text-foreground-primary">
          <Link href={`/sermons/${slug}`} className="hover:text-brand-primary">
            {sermon.title}
          </Link>
        </h2>
        {sermon.pastor?.name ? (
          <p className="mt-1 text-sm text-foreground-muted">{sermon.pastor.name}</p>
        ) : null}
        {sermon.scripture ? (
          <p className="text-sm text-foreground-secondary">{sermon.scripture}</p>
        ) : null}
        <p className="mt-auto pt-3 text-xs text-foreground-muted">
          {formatDate(sermon.publishedAt)}
        </p>
      </div>
    </article>
  );
}
