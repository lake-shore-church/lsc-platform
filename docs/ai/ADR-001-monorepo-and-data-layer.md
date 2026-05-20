# ADR-001: Monorepo with shared data layer

**Status:** Accepted (2026-05-20)

## Context

Lake Shore Church needs a public website, member portal, staff tools, and mobile app sharing one database and CMS.

## Decision

- **Turborepo + pnpm** monorepo (`lsc-platform`)
- **`packages/db`** — all Supabase access and queries
- **`packages/cms`** — all Sanity access (planned)
- Apps are thin: UI + routing + auth glue only

## Consequences

- Single migration source: `supabase-migration.sql`
- RLS enforced in Postgres; Next.js middleware is secondary
- Agents must not duplicate queries in `apps/web` or `apps/mobile`

## Alternatives considered

- Separate repos for web/mobile — rejected (duplicated business logic)
- Supabase Storage for media — rejected (Cloudflare R2 per blueprint)
