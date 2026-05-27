import { TextLink } from "@/components/ui/TextLink";
import { MINISTRIES_QUICK_LINKS } from "@/lib/ministriesHub";

export function MinistriesQuickLinks({ heading }: { heading: string }) {
  return (
    <nav className="mt-8 rounded-card border border-default bg-surface p-5" aria-label={heading}>
      <p className="text-label text-brand-accent">{heading}</p>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
        {MINISTRIES_QUICK_LINKS.map((item) => (
          <li key={item.href}>
            <TextLink href={item.href} withArrow={false} className="text-base font-medium">
              {item.label}
            </TextLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
