# LSC Platform — Project Status

**Last updated:** 2026-05-20  
**Active branch:** `feat/platform-scaffold-db-mobile` (ahead of `main`)  
**Repository:** https://github.com/lake-shore-church/lsc-platform

---

## Summary

Lake Shore Church West Loop is building **lsc-platform** — a monorepo with a Next.js public site + member/staff portals, an Expo mobile app, Supabase for data/auth, and Sanity for staff-editable content. **Public site is content-ready:** Sanity Studio at `/studio`, seeded sermon/pages/blog/siteConfig, Supabase sample events + prayer request, Vercel config at repo root, `pnpm build` passes. **Next:** polish portals (event CRUD, R2 upload); Vercel production deploy.

---

## Infrastructure & credentials

| Service | Status | Notes |
|---------|--------|-------|
| GitHub | ✅ Connected | `lake-shore-church/lsc-platform`; `gh` auth as `ushapitchandi` |
| Supabase | ✅ Live | Project `zstnygokvxrrszvkfejs`; migration run; all 14 tables verified |
| Supabase admin role | ✅ Set | On maintainer email |
| Sanity | ✅ Token set | Project `7hl877lg`, dataset `production` |
| Cloudflare R2 | ⏳ Placeholder | Keys not in `.env.local` yet |
| Resend / OpenAI / OneSignal | ⏳ Placeholder | Phase 2+ |
| Vercel (web) | 🟡 Config ready | `vercel.json` + `.env.production.example`; connect repo in Vercel dashboard |
| EAS (mobile) | ⏳ Not configured | Expo app scaffolded |

---

## Monorepo structure

| Path | Status | Description |
|------|--------|-------------|
| `apps/web` | 🟡 Public site done | Next.js 16; 11 `(public)/` pages + 4 API routes; Tailwind + LSC tokens; `@repo/db` + `@repo/cms` |
| `apps/mobile` | 🟡 Starter | Expo 54 + Expo Router tabs template |
| `apps/docs` | ⚪ Unused | Turborepo default; may remove later |
| `packages/db` | ✅ Complete | Typed client, 14 tables, 7 query modules |
| `packages/cms` | ✅ Complete | Sanity read/write clients, 7 schemas, 4 query modules |
| `packages/ui` | 🟡 Starter | Turborepo `@repo/ui`; needs `web/` + `native/` split per spec |
| `packages/config` | ⏳ Empty dir | Shared tailwind/tsconfig/eslint |
| `.cursorrules` | ✅ Present | Full architecture blueprint |
| `docs/` + `AGENTS.md` | ✅ Present | A11y Studio–style living docs, preflight, ADR, testing |
| `pnpm run verify` | ✅ Present | typecheck + lint across workspace |
| `supabase-migration.sql` | ✅ In repo | Reference copy; applied in Supabase |

---

## packages/db (complete)

- [x] `client.ts` — `createSupabaseClient()`, `getSupabase()`, typed `Database`
- [x] `types.ts` — 14 tables + 8 enums
- [x] `queries/sermons.ts` — `getSermons`, `getSermonBySlug`, `getSermonsBySeries`
- [x] `queries/prayers.ts` — `submitPrayer`, `getPrayers`, `updatePrayer`
- [x] `queries/events.ts` — `getEvents`, `getEventById`, `createRsvp`
- [x] `queries/members.ts` — `getProfile`, `updateProfile`, `getMemberRecord`
- [x] `queries/giving.ts` — `getGivingHistory`, `getGivingTotals`, `syncZeffyRecord`
- [x] `queries/expenses.ts` — `getExpenses`, `createExpense`, `getExpenseTotals`
- [x] `queries/blog.ts` — `getBlogPosts`, `getBlogPostBySlug`
- [x] Typecheck passes (`pnpm --filter @repo/db check-types`)

---

## packages/cms (complete)

- [x] `client.ts` — `createSanityReadClient()`, `createSanityWriteClient()`, singletons
- [x] `schemas/` — sermon, sermonSeries, event, blogPost, staffBio, page, siteConfig
- [x] `queries/sermons.ts` — `getSermons`, `getSermonBySlug`, `getSeriesList`, `getSermonsBySeries`
- [x] `queries/events.ts` — `getEvents`, `getEventById`
- [x] `queries/blog.ts` — `getBlogPosts`, `getBlogPostBySlug`
- [x] `queries/pages.ts` — `getPage`, `getSiteConfig`, `getAllStaffBios`
- [x] Typecheck passes (`pnpm --filter @repo/cms check-types`)
- [x] `activeTheme` on siteConfig schema
- [x] `siteConfig` seeded with lschurch.com content (`pnpm seed:site-config`)
- [x] Full content seed (`pnpm seed:content`) — sermon, about/beliefs pages, blog, staff, series
- [x] Sanity Studio embedded at `/studio` (`next-sanity`, `@sanity/vision`)

---

## apps/web design system

- [x] Tailwind CSS 3 + PostCSS — semantic tokens mapped to CSS variables
- [x] **4 themes:** default, advent, easter, warm (`data-theme`)
- [x] **3 modes:** light, dark, reading (`data-mode`) — reading uses Georgia 18px / 1.85 line-height
- [x] `packages/ui/web/tokens/themes.css` — all 9 theme×mode combinations
- [x] `ThemeSwitcher` — floating control, localStorage, system dark preference, Radix Popover
- [x] `ThemeScript` — inline bootstrap prevents flash on load
- [x] `siteConfig.activeTheme` in Sanity — CMS default for new visitors
- [x] Inter via `next/font/google`
- [x] Radix UI: Popover, Dialog, Slot

---

## Next.js routes

| Route group | Status |
|-------------|--------|
| `(public)/` — Home, About, Beliefs, Visit, Contact, Sermons, Blog, Live, Give, Prayer, Events, Resources | ✅ |
| `api/` — prayer, subscribe, contact, rsvp | ✅ |
| `/member/*` — Dashboard, Groups, Resources | ✅ (magic link) |
| `/staff/*` — Prayers, Sermons, Events, Financials, Members | ✅ (baseline) |
| `/login` — Magic link sign-in | ✅ |
| `[locale]/` — /es /fr /pt /zh | ⏳ Phase 3 |
| `studio/` — Sanity Studio embed | ✅ |
| `api/` — sermons RSS, tithing-statement, webhooks, revalidate | ⏳ |
| `/platform` — **Living status page** (reads `docs/*.md`) | ✅ |

---

## Mobile app (planned tabs — not built)

| Tab | Status |
|-----|--------|
| home, sermons, give, prayer, more | ⏳ Template only (Expo tabs starter) |

---

## Git branches

| Branch | Contains |
|--------|----------|
| `main` | Turborepo initial commit only |
| `feat/platform-scaffold-db-mobile` | db package, mobile scaffold, migration SQL, `.cursorrules`, docs (pending merge) |

**PR:** Not opened yet — compare at  
https://github.com/lake-shore-church/lsc-platform/compare/main...feat/platform-scaffold-db-mobile

---

## Blockers / decisions

- None critical. Optional: merge feature branch to `main` when review is done.
- Version note: spec says Next 14 / Expo 51; scaffold uses Next 16 / Expo 54 — acceptable unless downgrade required.

---

## Immediate next steps

1. **Merge PR** → `main` and deploy on Vercel (env vars from `apps/web/.env.production.example`)
2. **Supabase Auth redirect URLs** — add production URL to Auth settings + CORS for Studio
3. **Promote users** — set `profiles.role` to `member` or `staff` after first sign-in
4. **Event CRUD UI** + R2 sermon upload (Phase 2 remainder)
4. **Configure Resend** — production `RESEND_API_KEY` for form acknowledgements
5. Fill Cloudflare R2 credentials when media upload is needed
