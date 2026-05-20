# AI Context — LSC Platform

**Read at the start of every session** (with [ai-agent-preflight.md](../specs/ai-agent-preflight.md)).

---

## Session snapshot

| Field | Value |
|-------|-------|
| **Last updated** | 2026-05-20 |
| **Active branch** | `feat/platform-scaffold-db-mobile` |
| **Current phase** | Phase 1 — Foundation |
| **Just completed** | Full theme system (3×3), ThemeSwitcher, FOUT fix, `activeTheme` in CMS |
| **Next up** | `(public)/` Home + Sermons pages using theme tokens |
| **Blocked** | None |
| **PR** | Not opened — compare [main...feat/platform-scaffold-db-mobile](https://github.com/lake-shore-church/lsc-platform/compare/main...feat/platform-scaffold-db-mobile) |

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
