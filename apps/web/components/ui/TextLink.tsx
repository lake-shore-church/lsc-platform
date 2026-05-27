import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { isExternalHref } from "@/lib/ministryLinks";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Append → when label does not already end with an arrow */
  withArrow?: boolean;
};

function withTrailingArrow(children: ReactNode, enabled: boolean): ReactNode {
  if (!enabled) return children;
  if (typeof children === "string" && !children.trimEnd().endsWith("→")) {
    return `${children} →`;
  }
  return children;
}

/**
 * Standard text CTA: brand color, underline on hover, optional trailing arrow.
 */
export function TextLink({
  href,
  children,
  className = "",
  withArrow = true,
}: TextLinkProps) {
  const label = withTrailingArrow(children, withArrow);
  const classes = `link-hover font-semibold text-brand-primary ${className}`.trim();

  if (isExternalHref(href)) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {label}
    </Link>
  );
}
