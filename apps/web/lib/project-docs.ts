import { readFile } from "node:fs/promises";
import path from "node:path";

const DOCS_DIR = path.join(process.cwd(), "../../docs");

export async function readProjectDoc(filename: string): Promise<string> {
  const filePath = path.join(DOCS_DIR, filename);
  return readFile(filePath, "utf-8");
}

export async function getPlatformPageContent(): Promise<{
  status: string;
  roadmap: string;
  changelog: string;
  lastUpdated: string;
}> {
  const [status, roadmap, changelog] = await Promise.all([
    readProjectDoc("PROJECT_STATUS.md"),
    readProjectDoc("ROADMAP.md"),
    readProjectDoc("CHANGELOG.md"),
  ]);

  const dateMatch = status.match(/\*\*Last updated:\*\*\s*(\S+)/);
  const lastUpdated = dateMatch?.[1] ?? "unknown";

  return { status, roadmap, changelog, lastUpdated };
}
