import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { PASTOR_PHOTO_SRC } from "@/lib/pastorBioContent";

type Props = {
  name: string;
  role: string;
  summary: string;
  moreLabel: string;
};

export function PastorLeaderCard({ name, role, summary, moreLabel }: Props) {
  return (
    <article className="flex gap-6 rounded-card border border-default bg-surface p-6 shadow-card md:col-span-2">
      <div className="relative h-36 w-28 shrink-0 overflow-hidden rounded-card border border-default sm:h-44 sm:w-32">
        <Image
          src={PASTOR_PHOTO_SRC}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="128px"
        />
      </div>
      <div className="min-w-0">
        <h2 className="font-display text-h3 text-brand-primary">{name}</h2>
        <p className="text-sm font-semibold text-brand-accent">{role}</p>
        <p className="mt-3 text-base leading-relaxed text-foreground-secondary">{summary}</p>
        <Link
          href="/about#pastor"
          className="link-hover mt-4 inline-block font-semibold text-brand-primary"
        >
          {moreLabel} →
        </Link>
      </div>
    </article>
  );
}
