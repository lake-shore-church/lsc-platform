# AI Context — LSC Platform

**Read at the start of every session** (with [ai-agent-preflight.md](../specs/ai-agent-preflight.md)).

---

## Session snapshot

| Field | Value |
|-------|-------|
| **Last updated** | 2026-05-21 |
| **Active branch** | `main` |
| **Current phase** | Phase 2 — polish & production hardening |
| **Just completed** | 8-locale i18n, full beliefs (lschurch.com), dedication + salvation prayer, Hindi/French |
| **Next up** | R2 media, Zeffy live URL, translate beliefs/dedication per locale |
| **Blocked** | None |
| **PR** | [#1 merged](https://github.com/lake-shore-church/lsc-platform/pull/1) — all work on `main` |

---

## Project

- **Name:** lsc-platform (Lake Shore Church West Loop, Chicago)
- **Repo:** https://github.com/lake-shore-church/lsc-platform
- **Workspace:** `/Users/usha/Documents/LSAG Church/lsc-platform`
- **Blueprint:** `.cursorrules` + parent folder HTML/PDF blueprint

## Read order

1. [ai-agent-preflight.md](../specs/ai-agent-preflight.md)
2. This file (session snapshot)
3. [PROJECT_STATUS.md](../PROJECT_STATUS.md)
4. [.cursorrules](../../.cursorrules)

Entry point: [AGENTS.md](../../AGENTS.md).

## Services (names only — no secrets)

| Service | Reference |
|---------|-----------|
| Supabase | `zstnygokvxrrszvkfejs` |
| Sanity | `7hl877lg` / `production` |
| Secrets file | `apps/web/.env.local` (gitignored) |

## Package conventions

- DB: `packages/db` only
- CMS: `packages/cms` (planned)
- UI: `packages/ui/web` + `native`
- Web: RSC + `@repo/db`
- Media: Cloudflare R2 only

## Documentation workflow

[UPDATE-WORKFLOW.md](./UPDATE-WORKFLOW.md) · Rule: `.cursor/rules/project-documentation.mdc`

## Living status

- Git: `docs/*.md`
- Web: http://localhost:3000/platform
