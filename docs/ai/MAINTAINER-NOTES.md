# Maintainer notes (internal running log)

**Audience:** contributors and AI sessions — not church congregants.

**Not a substitute for git:** commits and PRs are the code source of truth. This file captures **why** and **session context**.

---

## 2026-05-21 — Infrastructure: domain, Resend, OneSignal, handover

- **DNS:** Bluehost nameservers for `lschurch.com` → Cloudflare `kaiser.ns.cloudflare.com` + `meg.ns.cloudflare.com`; site pending Active; imported DNS keeps Bluehost email (MX/SPF/DKIM); website still Squarespace until A/CNAME → Vercel.
- **Resend:** API key `lsc-platform-production`; Vercel `RESEND_*` Production+Preview; contact form verified on `lsc-platform-kappa.vercel.app`; from `onboarding@resend.dev` until `lschurch.com` verified.
- **OneSignal:** Free plan; App ID `a1c03b58-9d26-4388-8d34-11d3c882bd8f`; REST key on Vercel; Web Typical Site setup; code: `OneSignalSDKWorker.js`, `OneSignalInit.tsx` in layout (branch, not merged).
- **Prayer:** `/api/prayer` uses `createSupabaseAdminClient`; email errors non-blocking; private prayers work without login after deploy.
- **Handover:** `docs/handover/` + gitignored `CHURCH_ACCOUNTS.local.md`; `docs/RESUME_HERE.md` for next session.
- **Tech steward:** `ushadevi.pitchandi@gmail.com` for testing; no access to `lakeshorechurch@lschurch.com` yet.
- **Uncommitted on `feature/phase-2a`:** prayer route, OneSignal files, handover docs, `.gitignore` — push + merge to `main` next.

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

- Branch **`feat/platform-scaffold-db-mobile`** merged via [PR #1](https://github.com/lake-shore-church/lsc-platform/pull/1) (2026-05-20).
- Branch **`feat/mobile-native-foundation`** merged via [PR #2](https://github.com/lake-shore-church/lsc-platform/pull/2) (2026-05-21). Remote has only **`main`** now.
- Verified all 14 Supabase tables reachable via anon key.
- Pushed `main` (turbo starter) and feature branch to GitHub; PR not yet opened.

## 2026-05-20 — Initial scaffold

- Created monorepo under `LSAG Church/lsc-platform` (not `~/Developer`).
- Turborepo includes `apps/web` (Next 16), `apps/docs`, starter `packages/ui`.
- Instructions source: `claude_may_20_2026/` (`lsc-cursorrules.md`, `lsc-env.txt`, `lsc-migration.sql`).
