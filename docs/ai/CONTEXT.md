# AI Context — LSC Platform

**Read at the start of every session** (with [ai-agent-preflight.md](../specs/ai-agent-preflight.md)).

---

## Session snapshot

| Field | Value |
|-------|-------|
| **Last updated** | 2026-05-21 |
| **Active branch** | `main` |
| **Current phase** | Phase 2 — production polish |
| **Just completed** | Livestream system; Pastor Brian site copy (all locales); presenter mode merged to `main`; `@repo/ui` typecheck fix |
| **Next up** | Supabase `presentation_state` SQL + Realtime; Sanity Site Config refresh; OneSignal optional |
| **Blocked** | None |
| **PRs** | Work lands on `main`; open PR only when large feature needs review |

---

## Project

- **Name:** lsc-platform (Lake Shore Church West Loop, Chicago)
- **Repo:** https://github.com/lake-shore-church/lsc-platform
- **Workspace:** `/Users/usha/Documents/LSAG Church/lsc-platform`
- **Production web:** https://lsc-platform-kappa.vercel.app

## Read order

1. [ai-agent-preflight.md](../specs/ai-agent-preflight.md)
2. This file
3. [PROJECT_STATUS.md](../PROJECT_STATUS.md)
4. [.cursorrules](../../.cursorrules)

Entry point: [AGENTS.md](../../AGENTS.md).

## Key docs (current features)

| Topic | Doc |
|-------|-----|
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

## Documentation workflow

[UPDATE-WORKFLOW.md](./UPDATE-WORKFLOW.md)
