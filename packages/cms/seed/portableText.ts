/** Convert plain-text paragraphs to Sanity portable text blocks. */
export function paragraphsToBlocks(paragraphs: string[]) {
  return paragraphs
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text, index) => ({
      _type: "block" as const,
      _key: `block-${index}`,
      style: "normal" as const,
      markDefs: [],
      children: [
        {
          _type: "span" as const,
          _key: `span-${index}`,
          text,
          marks: [] as string[],
        },
      ],
    }));
}
