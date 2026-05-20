# Prompt hub — copy-paste blocks

Merge new blocks into this file. Do not replace the whole hub.

---

## Session start (any agent)

```
Read docs/specs/ai-agent-preflight.md and docs/ai/CONTEXT.md.
Give me a short recap of non-negotiables and current phase before we build [X].
```

---

## Git — sync main and start a feature branch

```bash
cd lsc-platform
git checkout main
git pull origin main
git checkout -b feature/SHORT-TOPIC
pnpm install
pnpm run verify
```

---

## After completing a task (agent)

```
Update docs/CHANGELOG.md, docs/PROJECT_STATUS.md, and docs/ai/CONTEXT.md session snapshot.
If non-trivial, add one paragraph to docs/ai/MAINTAINER-NOTES.md.
```

---

## Build packages/cms (next milestone)

```
In lsc-platform monorepo, build packages/cms per .cursorrules:
- package.json @repo/cms
- client.ts with NEXT_PUBLIC_SANITY_* env vars
- schemas/ for church content types
- queries/ for GROQ (never inline in apps)
- index.ts exports
Match patterns from packages/db. Update docs when done.
```

---

## Wire web homepage to Supabase

```
In apps/web, create a Server Component homepage that uses @repo/db:
- getEvents({ upcomingFrom: now, limit: 5 })
- getSermons({ limit: 3 })
Use Lake Shore brand colors from .cursorrules. Update docs/CHANGELOG.md.
```

---

## Pre-PR verify

```bash
pnpm run verify
pnpm --filter web build
git status   # confirm .env.local not staged
```
