import type { PortableTextBlock } from "@repo/cms";

function renderBlock(block: PortableTextBlock, index: number) {
  const text =
    block.children
      ?.map((c) => ("text" in c ? (c.text as string) : ""))
      .join("") ?? "";

  if (!text) return null;

  const style = (block as { style?: string }).style;

  if (style === "h2") {
    return (
      <h2 key={index} className="mt-8 text-2xl font-semibold text-brand-primary">
        {text}
      </h2>
    );
  }
  if (style === "h3") {
    return (
      <h3 key={index} className="mt-6 text-xl font-semibold text-foreground-primary">
        {text}
      </h3>
    );
  }
  if (style === "blockquote") {
    return (
      <blockquote
        key={index}
        className="my-4 border-l-4 border-brand-accent pl-4 italic text-foreground-secondary"
      >
        {text}
      </blockquote>
    );
  }

  return (
    <p key={index} className="mt-4 leading-relaxed text-foreground-secondary">
      {text}
    </p>
  );
}

export function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) {
    return <p className="text-foreground-muted">Content coming soon.</p>;
  }

  return <div className="prose-lsc">{value.map(renderBlock)}</div>;
}
