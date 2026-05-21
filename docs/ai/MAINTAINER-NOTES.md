# Maintainer notes (internal running log)

**Audience:** contributors and AI sessions — not church congregants.

**Not a substitute for git:** commits and PRs are the code source of truth. This file captures **why** and **session context**.

---

## 2026-05-20 — Theme system (3 themes × light/dark/reading)

- `packages/ui/web/tokens/themes.css`, `ThemeSwitcher.tsx`, `ThemeScript.tsx`.
- Tailwind maps CSS variables; layout loads CMS `activeTheme` on `<html>`.
- Commit message: `feat: packages/cms + full theme system (3 themes × light/dark/reading)`.

## 2026-05-20 — packages/cms + Tailwind on web

- **`@repo/cms`**: Sanity read/write clients, 7 schema types, queries (sermons, events, blog, pages/siteConfig/staff).
- **`apps/web`**: Tailwind 3, LSC colors, Inter, Radix dialog/slot, `@repo/cms` dependency.
- `pnpm run verify` + `pnpm --filter web build` pass.

## 2026-05-20 — A11y Studio–parity documentation pass

- Added full agent/contributor stack: `AGENTS.md`, `CONTRIBUTING.md`, preflight, release checklist, master spec index, `TESTING.md`, `SDLC_STACK.md`, `IDENTITY.md`, `ADR-001`, prompt hub, `feature-branches` cursor rule, root `pnpm run verify`.
- Upgraded `/platform` page layout (LSC brand colors #1B4F8A / #0F7B6C / #B45309, sticky nav, GitHub links).

## 2026-05-20 — Living documentation + `/platform` page

- Added **`docs/`** folder: `PROJECT_STATUS.md`, `ROADMAP.md`, `CHANGELOG.md`, `ai/CONTEXT.md`, `ai/UPDATE-WORKFLOW.md`.
- Build verified: `pnpm --filter web build` includes static route `/platform`.
- Pattern modeled on **A11y Studio** (`docs/specs/living-doc-implementation.md`, `docs/ai/MAINTAINER-NOTES.md`, website `/docs/internal/`).
- LSC uses **git markdown only** (no Cloudflare KV editor in v1); website renders same files at `/platform`.
- Cursor rule: `.cursor/rules/project-documentation.mdc` — agents must update changelog + status on changes.

## 2026-05-20 — Platform foundation branch

- Branch **`feat/platform-scaffold-db-mobile`** merged to **`main`** via [PR #1](https://github.com/lake-shore-church/lsc-platform/pull/1) (2026-05-20). Remote has only `main` now.
- Verified all 14 Supabase tables reachable via anon key.
- Pushed `main` (turbo starter) and feature branch to GitHub; PR not yet opened.

## 2026-05-20 — Initial scaffold

- Created monorepo under `LSAG Church/lsc-platform` (not `~/Developer`).
- Turborepo includes `apps/web` (Next 16), `apps/docs`, starter `packages/ui`.
- Instructions source: `claude_may_20_2026/` (`lsc-cursorrules.md`, `lsc-env.txt`, `lsc-migration.sql`).
