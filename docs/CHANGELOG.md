# LSC Platform — Changelog

All notable changes to this monorepo. Format based on [Keep a Changelog](https://keepachangelog.com/).

---

## [Unreleased]

### Added

- **Zero-cost live streaming** — [ZERO_COST_LIVESTREAM.md](./ZERO_COST_LIVESTREAM.md): Mevo → YouTube, embed on web/mobile; Sunday checklist.
- **Web HLS player** — `/live` plays `.m3u8` in-house streams (hls.js) when Mux is enabled later.
- **In-house livestream plan** — [LIVESTREAM_INHOUSE_PLAN.md](./LIVESTREAM_INHOUSE_PLAN.md) (deferred paid upgrade).
- **Demo meeting checklist** — [DEMO_MEETING_CHECKLIST.md](./DEMO_MEETING_CHECKLIST.md) for Pastor/members website walkthrough.

### Changed

- **Live streaming default** — CMS defaults and docs use **YouTube embed ($0)**; Mux path optional.
- **`/live` page** — Accurate copy when offline; in-app message when live; HLS + YouTube players.
- **Staff livestream control** — Copy reflects Mevo → YouTube → Go live workflow.
- **Mobile Live tab** — Clearer in-app message for YouTube embed mode.

- **About Pastor Brian** — full biography from [craigbrianlarson.com/about](https://craigbrianlarson.com/about/), portrait photo, published works list, and external links; leaders page shows photo.
- **Podcast RSS** — canonical site URL from deployment host; dedupe duplicate sermon episodes; video link in description.
- **Nav** — Small Groups → Sunday school ministry; Events own link; removed duplicate About Giving.
- Homepage presentation: testimonials from CMS when available, warmer upcoming-sermon copy, `/live` strip links to live page, friendlier empty events message.
- `/live` and `/testimonies`: honest copy about in-house video upgrade; removed placeholder video/audio cards from testimonies fallback.

### Added (prior — feature/phase-2a)

- **Content platform evaluation** — `docs/CONTENT_PLATFORM_EVALUATION.md` phases the proposed 7-page mega-spec (this-week API, inline editing, weekly archive) vs current IA; Pastor sign-off required before large redirects.
- **Phase 2A** — 501(c)(3) Give trust badge (web + mobile); PayPal Giving Fund default on; Sanity `churchTaxId`, `paypalGivingUrl`; mobile Give uses Zeffy embed from `/api/mobile/config`.
- **Email** — Prayer and contact acknowledgements via Resend; mobile prayer optional email; contact form verified on Vercel production.
- **Push** — OneSignal scheduled cron routes (Wed/Sat/Sun); `OneSignalInit` + service workers for web push; Mevo → Restream in `LIVESTREAM_SETUP.md`.
- **Handover** — `docs/handover/` (template + gitignored `CHURCH_ACCOUNTS.local.md`); Cloudflare NS documented.
- **Prayer API** — Server uses `createSupabaseAdminClient` so public/private requests save correctly.
- **Content expansion (2026-05-26)** — ministries hub (`/ministries` + detail pages), `/faq`, `/about/leaders`, `/testimonies`, homepage year promise + weekly gatherings.
- **Unified Zoom join (`/join`)** — same one-click redirect for web + mobile (meeting ID + passcode display); new doc `docs/ZOOM_JOIN.md`.
- **CMS types & seed scripts** — added Sanity `ministryPage` + `testimony` schemas; seeded ministries/testimonies.

### Changed

- Mobile `/api/mobile/config` returns giving + YouTube fields for app.
- `docs/ai/CONTEXT.md`, `CLAUDE_SYNC_PROMPT.md`, `PROJECT_STATUS.md`, `PHASE_2A_SETUP.md` synced (2026-05-21 infra session).

### Infrastructure (2026-05-21)

- Bluehost nameservers → Cloudflare (`kaiser.ns.cloudflare.com`, `meg.ns.cloudflare.com`) for `lschurch.com`.
- Vercel env: Resend, OneSignal, `CRON_SECRET`, Supabase service role; production redeploy.

---

## 2026-05-21 — Livestream, church voice, presenter mode

### Added

- **Presenter mode** — Mobile `/presenter` (staff/admin): landscape slides, swipe + volume navigation, haptics, thumbnails, YouTube modal; `presentation_state` + Realtime; web `PresentationSync`; `docs/PRESENTER_MODE.md`.
- **Livestream** — Sanity live toggle, `/api/live-status`, staff go-live, `/live` page, nav badge, mobile Live tab; `docs/LIVESTREAM_SETUP.md`.

### Changed

- **Church voice (lschurch.com)** — Resurrection hero, distinctives, exact Sunday service copy; removed "Authentic Christianity Together"; all 8 locales; mobile quote card.
- **`@repo/ui`** — Fix typecheck (decouple from `@repo/media` image imports).
- **Docs** — PROJECT_STATUS, CONTEXT, ROADMAP, README synced; `feature/presenter-mode` merged to `main`.

### Changed (earlier 2026-05-21)

- **Repo hygiene** — [PR #1](https://github.com/lake-shore-church/lsc-platform/pull/1) and [PR #2](https://github.com/lake-shore-church/lsc-platform/pull/2) merged; remote has only `main`.
- **Documentation audit** — ROADMAP, PROJECT_STATUS, TECH-TEAM-GUIDE, specs synced with `main`.

### Added

- **8-locale i18n** — `en`, `es`, `zh`, `ja`, `ta`, `tl`, `hi`, `fr` via `next-intl`; language switcher + `NEXT_LOCALE` cookie; CMS hero only when `locale === "en"`.
- **Translated public pages** — Home, nav, Give, Prayer, Plan a Visit use `getTranslations` / `useTranslations`.
- **Sermon CMS translations** — `translations[]` on sermon + blogPost in Sanity; localized sermon detail with English video + expandable English summary.
- **Translation APIs** — `POST /api/translate` (DeepL: es, zh, ja, fr), `POST /api/translate-google` (ta, tl, hi). Staff dashboard at `/staff/translations`.
- **Beliefs page** — Full [lschurch.com/beliefs](https://lschurch.com/beliefs) content (10 sections + A/G link).
- **Dedication page** — `/dedication` — Holy Spirit as Director of Technology; salvation prayer; next steps.
- **Mobile Phase 1** ([PR #2](https://github.com/lake-shore-church/lsc-platform/pull/2)) — `MOBILE_SETUP.md`, shared Tailwind tokens, Supabase auth (`lschurch://`), `eas.json`, Ionicons tabs, language picker on More.
- **Future locales scaffold** — `yo`, `tw`, `ms` documented in `i18n/routing.ts` (not active).

### Added

- **Real content seed** — 10 sermons (Sunday + Sheer Goodness series), 4 weekly devotionals, Pastor Brian book resource, updated siteConfig; Supabase events (Sunday, Men’s Bible Study, Welcome Lunch).
- **Homepage redesign** — Full-viewport Chicago hero, service info strip, featured series, ministry pillars, testimonials, Facebook feed + email subscribe, footer CTA.
- **About & Beliefs** — Static pages with real Assemblies of God copy and FAQ JSON-LD.
- **Podcast RSS** — `/podcast.xml` iTunes-compatible feed from Sanity sermons.
- **Staff sermon import** — `/staff/sermons/import` YouTube URL → Sanity document.
- **Mobile app** — Five tabs (Home, Sermons, Prayer, Give, More), sermon detail with WebView, mobile API routes, `react-native-webview`.
- **FacebookFeed** — `@repo/ui/web/FacebookFeed` with iframe + fallback link.
- **Public prayer wall API** — `GET /api/prayers` for mobile and community display.

### Fixed

- **Magic link login** — Auth callback sets session cookies on redirect; supports email confirmation `token_hash` links.
- **Magic link login (env)** — `signInWithOtp` runs via server action so Supabase env vars load reliably (fixes client `fetch` "Invalid value" in monorepo).

### Added

- **Member portal (full)** — Giving history + PDF statement, prayer list, notification prefs, shared layout nav.
- **Staff portal (full)** — Prayer kanban, events admin + RSVP reminders, financial dashboard (recharts), members directory, blog list, sermon Studio link.
- **PDF APIs** — `GET /api/tithing-statement`, `GET /api/financial-report` via `@react-pdf/renderer`.
- **APIs** — `POST /api/send-reminder`, `POST /api/send-newsletter`.
- **Auth middleware** — Session refresh on all routes; staff role enforced on `/staff/*`.

### Changed

- **Repository** — PR #1 merged; `main` is the default branch on GitHub (feature branch removed).

## [2026-05-20] — feat/platform-scaffold-db-mobile (merged to main)

### Added

- **Member & staff portals** — Magic link `/login`; `/member/dashboard`, groups, resources; `/staff/prayers` (triage), sermons → Studio, events list, financials + expenses, members directory. Supabase SSR auth + middleware.
- **Tech team guide** — `docs/TECH-TEAM-GUIDE.md` + `/platform/tech` (deploy, Studio, accounts, troubleshooting in plain language).
- **Sanity Studio** — `/studio` route with `next-sanity`, `@sanity/vision`, schemas from `@repo/cms`.
- **Content seed** — `pnpm seed:content` seeds sermon, about/beliefs pages, blog post, siteConfig, staff/series; Supabase sample events + prayer request.
- **Vercel deploy config** — Root `vercel.json`, `apps/web/.env.production.example`, extra `next/image` domains (Sanity CDN, media.lschurch.com).

### Changed

- **Homepage polish** — Removed duplicate quick-info strip and footer CTA; visit/address lives in “We'd love to meet you”; blog hidden when empty. Faith-focused Unsplash imagery (church interior + Bible composite hero). Typography: Fraunces headings + Source Sans 3 body, improved line heights.

### Added

- **Homepage redesign** — 8 sections (full-viewport hero, quick-info cards, latest sermon, new here, ministry grid, events, blog teaser, footer CTA); Unsplash placeholders via `@repo/ui/web/images`.
- **Design personalities** — Themes renamed/rebuilt: **Bold** (Elevation-inspired), **Warm** (Cornerstone-inspired), **Advent**, **Easter** — each sets typography, spacing, radius, shadows, and hero overlay (not colours only).
- **Cornerstone-style navigation** — Grouped dropdowns (Watch, Connect, Grow, Serve, About); mobile full-screen menu; service times in header bar.

- **Warm theme (4th)** — superseded by personality system above; `default` theme migrated to `bold`. — Bloom-inspired `data-theme="warm"` with light, dark, and reading modes; brown swatch in ThemeSwitcher; Sanity `activeTheme` option `warm`.

- **Real church content from [lschurch.com](https://lschurch.com/)** — `siteConfig` schema fields (tagline, subTagline, structured address, service day/time, pastor); defaults + `pnpm seed:site-config`; home hero H1/H2/body from CMS; service-times strip below nav; Church JSON-LD in root layout.
- **Navigation** — Home, Sermons, Events, Give, Prayer, About, Beliefs, Plan a Visit, Contact (no cart/blog in header).

- **Public site (`apps/web/app/(public)/`)** — 11 pages: Home, About, Beliefs, Visit, Contact, Sermons (+ detail), Blog (+ detail), Live, Give, Prayer, Events, Resources. Server Components fetch from `@repo/cms` and `@repo/db`; theme CSS variables; `generateMetadata()` on every route; JSON-LD where specified.
- **API routes** — `POST /api/prayer`, `/api/subscribe`, `/api/contact`, `/api/rsvp` (Supabase + Resend).
- **Shared web UI** — `PublicHeader`/`PublicFooter`, `PortableText`, `SermonCard`/`SermonArchiveClient`/`SermonPlayer`, forms (Prayer, Contact, Subscribe), `EventsClient`, `GiveQr`.
- **Dependencies** — `@sanity/image-url`, `resend`, `react-qr-code` on `apps/web`.

- **Theme system** — 4 seasonal themes × 3 modes (light/dark/reading) via `packages/ui/web/tokens/themes.css`; `ThemeSwitcher` (Radix Popover, localStorage, 44px targets); `ThemeScript` FOUT prevention; Tailwind semantic tokens (`bg-background`, `text-brand-primary`, etc.).
- **`siteConfig.activeTheme`** — Sanity field for staff default theme (default/advent/easter/warm).
- **`packages/cms`** — `@sanity/client` read/write clients; schemas (sermon, sermonSeries, event, blogPost, staffBio, page, siteConfig); typed GROQ queries for sermons, events, blog, pages.
- **Tailwind on `apps/web`** — CSS variable–driven design tokens, Inter font, Radix Popover/Dialog/Slot.

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

- **`apps/web/package.json`** — Added `@repo/db` and `@repo/cms` workspace dependencies.
- **`apps/web/app/layout.tsx`** — Inter font, LSC metadata defaults.
- **`turbo.json`** — `globalEnv` for Sanity env vars.

### Infrastructure (operator)

- Supabase project live; migration applied; admin role set.
- Sanity API token configured in local `.env.local`.
- GitHub remote `lake-shore-church/lsc-platform`; `main` only after PR #1 and PR #2 merges.

---

## [0.0.1] — 2026-05-20

### Added

- Initial Turborepo monorepo (`create-turbo`) with `apps/web`, `apps/docs`, `packages/ui`, shared eslint/typescript configs.
