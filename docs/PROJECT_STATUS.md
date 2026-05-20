# LSC Platform — Project Status

**Last updated:** 2026-05-20  
**Active branch:** `feat/platform-scaffold-db-mobile` (1 commit ahead of `main`)  
**Repository:** https://github.com/lake-shore-church/lsc-platform

---

## Summary

Lake Shore Church West Loop is building **lsc-platform** — a monorepo with a Next.js public site + member/staff portals, an Expo mobile app, Supabase for data/auth, and Sanity for staff-editable content. Infrastructure credentials are in place; core database package is built; CMS and UI layers are next.

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
| Vercel (web) | ⏳ Not deployed | Local dev only |
| EAS (mobile) | ⏳ Not configured | Expo app scaffolded |

---

## Monorepo structure

| Path | Status | Description |
|------|--------|-------------|
| `apps/web` | 🟡 Starter | Next.js 16 (Turborepo default); no Tailwind yet; `@repo/db` linked |
| `apps/mobile` | 🟡 Starter | Expo 54 + Expo Router tabs template |
| `apps/docs` | ⚪ Unused | Turborepo default; may remove later |
| `packages/db` | ✅ Complete | Typed client, 14 tables, 7 query modules |
| `packages/cms` | ⏳ Not started | Sanity client, schemas, GROQ queries |
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

## Next.js routes (planned — not built)

| Route group | Status |
|-------------|--------|
| `(public)/` — Home, Sermons, Events, Give, Prayer, Blog, About… | ⏳ |
| `(member)/` — Dashboard, Groups, Resources | ⏳ |
| `(staff)/` — Prayer, Sermons, Events, Financials… | ⏳ |
| `[locale]/` — /es /fr /pt /zh | ⏳ Phase 3 |
| `studio/` — Sanity Studio embed | ⏳ |
| `api/` — tithing-statement, webhooks, revalidate | ⏳ |
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

1. Merge or continue on `feat/platform-scaffold-db-mobile`
2. Build `packages/cms` (Sanity)
3. Add Tailwind + design tokens to `apps/web`
4. Wire homepage to `@repo/db` (`getEvents`, `getSermons`)
5. Fill Cloudflare R2 credentials when media upload is needed
