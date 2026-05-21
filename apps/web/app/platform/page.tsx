import type { Metadata } from "next";
import { MarkdownContent } from "../../components/MarkdownContent";
import { getPlatformPageContent } from "../../lib/project-docs";
import styles from "./platform.module.css";

export const metadata: Metadata = {
  title: "Platform Status | Lake Shore Church",
  description:
    "Development status, roadmap, and changelog for the Lake Shore Church digital platform.",
  robots: { index: false, follow: false },
};

export default async function PlatformStatusPage() {
  const { status, roadmap, changelog, lastUpdated } =
    await getPlatformPageContent();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>Lake Shore Church — West Loop</p>
          <h1 className={styles.title}>Platform development status</h1>
          <p className={styles.subtitle}>
            Living document for the church website and mobile app. Updated{" "}
            <strong>{lastUpdated}</strong>. Source files in{" "}
            <code>docs/</code> — same content agents and maintainers edit.
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>Phase 1 — Foundation</span>
            <span className={`${styles.badge} ${styles.badgeBlue}`}>
              @repo/db shipped
            </span>
            <span className={`${styles.badge} ${styles.badgeAmber}`}>
              Internal / noindex
            </span>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav className={styles.nav} aria-label="On this page">
            <a href="#status" className={styles.navLink}>
              Current status
            </a>
            <a href="#roadmap" className={styles.navLink}>
              Roadmap
            </a>
            <a href="#changelog" className={styles.navLink}>
              Changelog
            </a>
            <p className={styles.navHeading}>For church tech</p>
            <a href="/platform/tech" className={styles.navLink}>
              Tech team guide
            </a>
            <a href="/dedication" className={styles.navLink}>
              Dedication (Holy Spirit, Director of Technology)
            </a>
            <p className={styles.navHeading}>For agents</p>
            <a
              href="https://github.com/lake-shore-church/lsc-platform/blob/feat/platform-scaffold-db-mobile/AGENTS.md"
              className={styles.navLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              AGENTS.md
            </a>
            <a
              href="https://github.com/lake-shore-church/lsc-platform/compare/main...feat/platform-scaffold-db-mobile"
              className={styles.navLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open PR compare
            </a>
          </nav>
        </aside>

        <div className={styles.content}>
          <section id="status" className={styles.section}>
            <h2 className={styles.sectionTitle}>Current status</h2>
            <MarkdownContent content={status} />
          </section>

          <section id="roadmap" className={styles.section}>
            <h2 className={styles.sectionTitle}>Roadmap</h2>
            <MarkdownContent content={roadmap} />
          </section>

          <section id="changelog" className={styles.section}>
            <h2 className={styles.sectionTitle}>Changelog</h2>
            <MarkdownContent content={changelog} />
            <p className={styles.footer}>
              Maintainers: update{" "}
              <code>docs/CHANGELOG.md</code> after every session — see{" "}
              <code>docs/ai/UPDATE-WORKFLOW.md</code>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
