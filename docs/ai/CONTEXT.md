# AI Context — LSC Platform

**Read at the start of every session** (with [ai-agent-preflight.md](../specs/ai-agent-preflight.md)).

---

## Session snapshot

| Field | Value |
|-------|-------|
| **Last updated** | 2026-05-22 |
| **Active branch** | `main` |
| **Current phase** | Phase 2A — post–Pastor visit (credentials + giving + notifications) |
| **Just completed** | Pastor visit (May 2026) — site approved; mobile web-parity home + themes; auth fix; `PASTOR_PRIORITIES.md` |
| **Next up** | Zeffy live + `giving_records` sync; OneSignal/Resend (Wed prayer, Sunday, go-live); push 2 commits to GitHub |
| **Blocked** | Pastor credentials (Zeffy, Sanity editor, optional OneSignal) |
| **PRs** | Work lands on `main`; open PR only when large feature needs review |

---

## Project

- **Name:** lsc-platform (Lake Shore Church West Loop, Chicago)
- **Repo:** https://github.com/lake-shore-church/lsc-platform
- **Workspace:** `/Users/usha/Documents/LSAG Church/lsc-platform`
- **Production web:** https://lsc-platform-kappa.vercel.app
- **Vision:** One platform — gospel reach globally; content entered once (CMS + staff portal) → web + mobile + email/push. See [PASTOR_PRIORITIES.md](../PASTOR_PRIORITIES.md).

## Read order

1. [ai-agent-preflight.md](../specs/ai-agent-preflight.md)
2. This file
3. [PROJECT_STATUS.md](../PROJECT_STATUS.md)
4. [PASTOR_PRIORITIES.md](../PASTOR_PRIORITIES.md)
5. [.cursorrules](../../.cursorrules)

Entry point: [AGENTS.md](../../AGENTS.md).

## Key docs (current features)

| Topic | Doc |
|-------|-----|
| Pastor / roadmap | [PASTOR_PRIORITIES.md](../PASTOR_PRIORITIES.md), [ROADMAP.md](../ROADMAP.md) |
| Livestream | [LIVESTREAM_SETUP.md](../LIVESTREAM_SETUP.md) |
| Presenter / projector | [PRESENTER_MODE.md](../PRESENTER_MODE.md) |
| Mobile + auth | [MOBILE_SETUP.md](../MOBILE_SETUP.md), [AUTH_TROUBLESHOOTING.md](../AUTH_TROUBLESHOOTING.md) |
| Changelog | [CHANGELOG.md](../CHANGELOG.md) |

## Services (names only — no secrets)

| Service | Reference |
|---------|-----------|
| Supabase | `zstnygokvxrrszvkfejs` |
| Sanity | `7hl877lg` / `production` |
| Secrets | `apps/web/.env.local`, `apps/mobile/.env` (gitignored) |

## Package conventions

- DB: `packages/db` only
- CMS: `packages/cms` (livestream helpers in `lib/livestream.ts`)
- Mobile data: `/api/mobile/*` and `/api/live-status`
- Images: `@repo/media` (`packages/media/images/home/`)
- Web: RSC + `@repo/db`; public pages under `app/[locale]/(public)/`

## Shipped highlights (do not re-build from scratch)

- **Web:** 8 locales; Pastor Brian voice; livestream + `/live`; staff go-live; presenter web sync; staff/member portals; `/podcast.xml`
- **Mobile (Expo 54):** Home ≈ web; themes (Bold/Warm/Advent/Easter); Sermons Live/Archive; Prayer; Give→web Zeffy; More; presenter mode (staff); magic-link auth
- **Monorepo:** `pnpm run verify` = types + lint across packages

## Phase 2A (not started — needs credentials)

- Zeffy 0% giving + sync → `giving_records` + mobile giving history
- OneSignal + Resend: Wednesday prayer, Sunday service, go-live
- Staff notification schedule UI; mobile native About/Events + calendar
- WordPress RSS decision (optional)

## Documentation workflow

[UPDATE-WORKFLOW.md](./UPDATE-WORKFLOW.md)
