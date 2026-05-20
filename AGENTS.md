# Instructions for AI coding agents (Cursor, Claude, Copilot)

**Lake Shore Church — lsc-platform** monorepo: Next.js web, Expo mobile, Supabase, Sanity CMS.

## Read order (start of every session)

1. **[docs/specs/ai-agent-preflight.md](docs/specs/ai-agent-preflight.md)** — non-negotiables; give the human a short §1–§6 recap before architecture work.
2. **[docs/ai/CONTEXT.md](docs/ai/CONTEXT.md)** — session snapshot, active branch, next tasks.
3. **[docs/PROJECT_STATUS.md](docs/PROJECT_STATUS.md)** — what's done / in progress.
4. **[.cursorrules](.cursorrules)** — authoritative architecture (routes, packages, RLS, services).

Narrow single-file fix: **CONTEXT** + **`.cursorrules`** may suffice.

## Git branching

Planned work → **`feature/<topic>`** from **`main`**, PR when ready. See **[.cursor/rules/feature-branches.mdc](.cursor/rules/feature-branches.mdc)** and **[docs/prompts/copy-paste.md](docs/prompts/copy-paste.md)**.

Before push: **`pnpm run verify`**.

## Documentation (mandatory after changes)

| Change type | Update |
|-------------|--------|
| Any feature/fix | `docs/CHANGELOG.md`, `docs/PROJECT_STATUS.md` |
| Phase/roadmap shift | `docs/ROADMAP.md` |
| Non-trivial session | `docs/ai/MAINTAINER-NOTES.md` |
| Architecture decision | `docs/ai/ADR-*.md` (new file) |

Rule: **[.cursor/rules/project-documentation.mdc](.cursor/rules/project-documentation.mdc)**. Living page: **`/platform`** (reads `docs/*.md`).

## Secrets

Never commit `.env.local` or paste keys in chat. Reference env var **names** only in docs.

## Specs

- Feature scope: **[docs/specs/master-feature-spec.md](docs/specs/master-feature-spec.md)** (summary + link to blueprint)
- Deploy: **[docs/specs/release-checklist.md](docs/specs/release-checklist.md)**
- Stack: **[docs/SDLC_STACK.md](docs/SDLC_STACK.md)**
