import type { Metadata } from "next";
import Link from "next/link";
import { MarkdownContent } from "../../../components/MarkdownContent";
import { getTechTeamGuideContent } from "../../../lib/project-docs";
import styles from "../platform.module.css";

export const metadata: Metadata = {
  title: "Tech Team Guide | Lake Shore Church Platform",
  description:
    "Plain-language guide for church tech volunteers: deploy, Studio, accounts, and troubleshooting.",
  robots: { index: false, follow: false },
};

export default async function TechTeamGuidePage() {
  const { guide, lastUpdated } = await getTechTeamGuideContent();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <p className={styles.eyebrow}>Lake Shore Church — West Loop</p>
          <h1 className={styles.title}>Tech team guide</h1>
          <p className={styles.subtitle}>
            For church volunteers who deploy and support the website — not
            everyday staff. Updated <strong>{lastUpdated}</strong>. Source:{" "}
            <code>docs/TECH-TEAM-GUIDE.md</code>
          </p>
          <div className={styles.badges}>
            <span className={styles.badge}>Internal / noindex</span>
            <span className={`${styles.badge} ${styles.badgeBlue}`}>
              Long-term reference
            </span>
          </div>
          <p style={{ marginTop: "1rem", fontSize: "0.9375rem" }}>
            <Link href="/platform" className={styles.navLink}>
              ← Platform status
            </Link>
          </p>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <nav className={styles.nav} aria-label="On this page">
            <p className={styles.navHeading}>On this page</p>
            <a href="#lake-shore-church--tech-team-guide" className={styles.navLink}>
              Overview
            </a>
            <a href="#quick-summary" className={styles.navLink}>
              Who does what
            </a>
            <a href="#for-church-staff--sanity-studio-no-code" className={styles.navLink}>
              Staff & Studio
            </a>
            <a href="#go-live-on-vercel-step-by-step" className={styles.navLink}>
              Go live (Vercel)
            </a>
            <a href="#troubleshooting" className={styles.navLink}>
              Troubleshooting
            </a>
            <a href="#checklist-first-production-launch" className={styles.navLink}>
              Launch checklist
            </a>
            <p className={styles.navHeading}>Related</p>
            <Link href="/platform" className={styles.navLink}>
              Platform status
            </Link>
            <a
              href="https://www.sanity.io/manage/project/7hl877lg"
              className={styles.navLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Sanity manage
            </a>
            <a
              href="https://github.com/lake-shore-church/lsc-platform"
              className={styles.navLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repo
            </a>
          </nav>
        </aside>

        <div className={styles.content}>
          <section className={styles.section}>
            <MarkdownContent content={guide} />
          </section>
        </div>
      </div>
    </main>
  );
}
