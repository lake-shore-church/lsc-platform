# Contributing — LSC Platform

Internal project for **Lake Shore Church West Loop**. Maintainers: church tech team + contracted developers.

## Prerequisites

- Node 18+
- pnpm 9 (`corepack enable pnpm`)
- Accounts: Supabase, Sanity, GitHub (`lake-shore-church`)

## Clone and install

```bash
git clone https://github.com/lake-shore-church/lsc-platform.git
cd lsc-platform
pnpm install
```

Copy env template values into **`apps/web/.env.local`** (never commit). See `claude_may_20_2026/lsc-env.txt` or ask a maintainer.

## Daily commands

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Dev servers (web + docs) |
| `pnpm --filter web dev` | Next.js only → http://localhost:3000 |
| `pnpm --filter mobile start` | Expo mobile |
| `pnpm run verify` | Typecheck + lint (run before PR) |
| `pnpm run build` | Production build all apps |

## Git branching

1. `git checkout main && git pull`
2. `git checkout -b feature/<short-topic>`
3. Work, update **`docs/`** (see [docs/ai/UPDATE-WORKFLOW.md](docs/ai/UPDATE-WORKFLOW.md))
4. `pnpm run verify`
5. Push branch → open PR to **`main`**

Copy-paste prompts: [docs/prompts/copy-paste.md](docs/prompts/copy-paste.md).

## AI agents

Read **[AGENTS.md](AGENTS.md)** first.

## Project status page

Local: http://localhost:3000/platform — mirrors `docs/PROJECT_STATUS.md` and roadmap.
