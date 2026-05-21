# LSC Platform — identity (registry)

> Factual handles and URLs for agents and release prep. Not congregant-facing marketing copy.

Update when domains, repos, or service IDs change.

## Core registry

| Platform | Handle / URL | Notes |
|----------|--------------|-------|
| GitHub org | https://github.com/lake-shore-church | |
| Repository | https://github.com/lake-shore-church/lsc-platform | Private/internal development |
| Supabase project | `zstnygokvxrrszvkfejs` | https://zstnygokvxrrszvkfejs.supabase.co |
| Sanity project | `7hl877lg` | Dataset `production` |
| Primary domain (planned) | https://lschurch.com | Public site |
| Media CDN (planned) | https://media.lschurch.com | Cloudflare R2 custom domain |
| Contact email (planned) | hello@lschurch.com | Resend |

## Product surfaces

| Surface | Path / app | Status |
|---------|------------|--------|
| Public website | `apps/web` | Scaffold |
| Mobile app | `apps/mobile` | Expo 54; 5 tabs; API + Supabase auth; see MOBILE_SETUP.md |
| Staff Sanity Studio | `/studio` (planned) | ⏳ |
| Dev status page | `/platform` | ✅ |
| Member portal | `(member)/` (planned) | ⏳ |
| Staff portal | `(staff)/` (planned) | ⏳ |

## Maintainer-only notes

Operational secrets and personal account details stay in **`apps/web/.env.local`** only — never in tracked `docs/`.

**Related:** [CONTEXT.md](./CONTEXT.md), [../SDLC_STACK.md](../SDLC_STACK.md), [.cursorrules](../../.cursorrules).
