# LSC Platform — Changelog

All notable changes to this monorepo. Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased] — feat/platform-scaffold-db-mobile

### Added

- **`docs/`** — Living documentation: `PROJECT_STATUS.md`, `ROADMAP.md`, `CHANGELOG.md`, `ai/CONTEXT.md`, `ai/MAINTAINER-NOTES.md`, `ai/UPDATE-WORKFLOW.md` (A11y Studio–style, git as source of truth).
- **`/platform` page** — Next.js route renders `docs/` markdown (status, roadmap, changelog); `noindex` for now.
- **`.cursor/rules/project-documentation.mdc`** — Requires agents to update changelog + status on every change.
- **A11y Studio–parity docs** — `AGENTS.md`, `CONTRIBUTING.md`, `docs/specs/ai-agent-preflight.md`, `docs/SDLC_STACK.md`, `docs/TESTING.md`, `docs/prompts/copy-paste.md`, `docs/ai/IDENTITY.md`, `docs/ai/ADR-001`, `.cursor/rules/feature-branches.mdc`, `pnpm run verify`.
- **`/platform` UI** — Church brand colors, sticky sidebar, agent links.

- **`packages/db`** — Typed Supabase client, `Database` types for 14 tables and 8 enums, query modules (sermons, prayers, events, members, giving, expenses, blog).
- **`apps/mobile`** — Expo 54 app with Expo Router tabs template.
- **`supabase-migration.sql`** — Full Postgres schema with RLS policies (reference in repo).
- **`.cursorrules`** — Architecture and conventions for AI/human contributors.
- **`docs/`** — Project status, roadmap, changelog, and AI maintainer docs (living documentation).
- **`/platform` page** — Website mirror of project status and roadmap (Next.js).

### Changed

- **`apps/web/package.json`** — Added `@repo/db` workspace dependency.

### Infrastructure (operator)

- Supabase project live; migration applied; admin role set.
- Sanity API token configured in local `.env.local`.
- GitHub remote `lake-shore-church/lsc-platform`; branches `main` and `feat/platform-scaffold-db-mobile` pushed.

---

## [0.0.1] — 2026-05-20

### Added

- Initial Turborepo monorepo (`create-turbo`) with `apps/web`, `apps/docs`, `packages/ui`, shared eslint/typescript configs.
