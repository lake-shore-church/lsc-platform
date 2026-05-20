import type { ReactNode } from "react";

/**
 * Lightweight markdown renderer for project docs (headings, lists, tables, links, code).
 * Source files live in repo-root docs/ — no CMS dependency.
 */

function inlineFormat(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(<strong key={match.index}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      parts.push(
        <code key={match.index} className="rounded bg-black/10 px-1 py-0.5 text-sm">
          {token.slice(1, -1)}
        </code>,
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={match[3]}
          className="text-blue-700 underline hover:text-blue-900"
          target={match[3]?.startsWith("http") ? "_blank" : undefined}
          rel={match[3]?.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {match[2]}
        </a>,
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) parts.push(text.slice(last));
  return parts.length ? parts : [text];
}

function parseTableRow(line: string): string[] {
  return line
    .split("|")
    .slice(1, -1)
    .map((cell) => cell.trim());
}

function isTableSeparator(line: string): boolean {
  return /^\|[\s\-:|]+\|$/.test(line.trim());
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i] ?? "";

    if (line.startsWith("---")) {
      blocks.push(<hr key={key++} className="my-8 border-t border-gray-200" />);
      i++;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push(
        <h3 key={key++} className="mb-2 mt-6 text-lg font-semibold text-gray-900">
          {inlineFormat(line.slice(4))}
        </h3>,
      );
      i++;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={key++} className="mb-3 mt-10 text-xl font-bold text-gray-900">
          {inlineFormat(line.slice(3))}
        </h2>,
      );
      i++;
      continue;
    }

    if (line.startsWith("# ")) {
      blocks.push(
        <h1 key={key++} className="mb-4 text-2xl font-bold text-gray-900">
          {inlineFormat(line.slice(2))}
        </h1>,
      );
      i++;
      continue;
    }

    if (line.startsWith("|") && i + 1 < lines.length && isTableSeparator(lines[i + 1] ?? "")) {
      const header = parseTableRow(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && (lines[i] ?? "").startsWith("|")) {
        rows.push(parseTableRow(lines[i] ?? ""));
        i++;
      }
      blocks.push(
        <div key={key++} className="my-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {header.map((cell, ci) => (
                  <th key={ci} className="px-3 py-2 font-semibold">
                    {inlineFormat(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-100">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2">
                      {inlineFormat(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i] ?? "").startsWith("- ")) {
        items.push((lines[i] ?? "").slice(2));
        i++;
      }
      blocks.push(
        <ul key={key++} className="my-3 list-disc space-y-1 pl-6">
          {items.map((item, ii) => (
            <li key={ii}>{inlineFormat(item)}</li>
          ))}
        </ul>,
      );
      continue;
    }

    if (line.trim() === "") {
      i++;
      continue;
    }

    blocks.push(
      <p key={key++} className="my-2 leading-relaxed text-gray-700">
        {inlineFormat(line)}
      </p>,
    );
    i++;
  }

  return <article className="max-w-none">{blocks}</article>;
}
