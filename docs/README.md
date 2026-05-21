# Lake Shore Church Platform — Documentation

**Living documentation** (modeled on [A11y Studio](https://github.com/a11ystudio/a11y-studio/tree/main/docs)): git markdown is source of truth; `/platform` on the website mirrors it at build time.

## Start here

| Role | Read first |
|------|------------|
| **Church tech volunteer** | [TECH-TEAM-GUIDE.md](./TECH-TEAM-GUIDE.md) → [/platform/tech](http://localhost:3000/platform/tech) |
| **Pastor / credentials meeting** | [PASTOR_MEETING_CHECKLIST.md](./PASTOR_MEETING_CHECKLIST.md) |
| **Mobile app setup** | [MOBILE_SETUP.md](./MOBILE_SETUP.md) |
| **Human maintainer** | [PROJECT_STATUS.md](./PROJECT_STATUS.md) → [ROADMAP.md](./ROADMAP.md) |
| **AI agent** | [AGENTS.md](../AGENTS.md) → [ai/CONTEXT.md](./ai/CONTEXT.md) → [specs/ai-agent-preflight.md](./specs/ai-agent-preflight.md) |
| **New contributor** | [CONTRIBUTING.md](../CONTRIBUTING.md) |

## Core docs

| File | Purpose |
|------|---------|
| [PROJECT_STATUS.md](./PROJECT_STATUS.md) | Current state — update every session |
| [ROADMAP.md](./ROADMAP.md) | Phase 1–3 plan |
| [CHANGELOG.md](./CHANGELOG.md) | Dated changes |
| [SDLC_STACK.md](./SDLC_STACK.md) | Services and hosting |
| [TESTING.md](./TESTING.md) | How to verify locally |
| [TECH-TEAM-GUIDE.md](./TECH-TEAM-GUIDE.md) | Deploy, Studio, accounts — plain language for church tech |
| [PASTOR_MEETING_CHECKLIST.md](./PASTOR_MEETING_CHECKLIST.md) | Pastor meeting — credentials, confirmations, post-meeting steps |
| [MOBILE_SETUP.md](./MOBILE_SETUP.md) | Mobile env, Supabase redirects, EAS — technical detail |
| [LIVESTREAM_SETUP.md](./LIVESTREAM_SETUP.md) | Restream, go-live, `/live`, mobile Live tab |
| [PRESENTER_MODE.md](./PRESENTER_MODE.md) | Projector slide control (staff mobile app) |
| [AUTH_TROUBLESHOOTING.md](./AUTH_TROUBLESHOOTING.md) | Magic link, rate limits, roles |
| [ai/THEOLOGY-OF-TECH.md](./ai/THEOLOGY-OF-TECH.md) | Holy Spirit as Director of Technology — doc standard |

## AI & process

| File | Purpose |
|------|---------|
| [ai/CONTEXT.md](./ai/CONTEXT.md) | Session snapshot + next tasks |
| [ai/MAINTAINER-NOTES.md](./ai/MAINTAINER-NOTES.md) | Internal session log |
| [ai/UPDATE-WORKFLOW.md](./ai/UPDATE-WORKFLOW.md) | When to update which file |
| [ai/IDENTITY.md](./ai/IDENTITY.md) | URLs, org, service IDs |
| [ai/ADR-001-monorepo-and-data-layer.md](./ai/ADR-001-monorepo-and-data-layer.md) | Architecture decision record |
| [prompts/copy-paste.md](./prompts/copy-paste.md) | Chat prompt hub |

## Specs

| File | Purpose |
|------|---------|
| [specs/ai-agent-preflight.md](./specs/ai-agent-preflight.md) | Non-negotiables before design |
| [specs/master-feature-spec.md](./specs/master-feature-spec.md) | Feature index → `.cursorrules` |
| [specs/release-checklist.md](./specs/release-checklist.md) | Pre-PR / pre-deploy gates |

## Cursor rules

- `.cursor/rules/project-documentation.mdc` — update changelog + status
- `.cursor/rules/feature-branches.mdc` — branch workflow

## Website mirror

**`/platform`** — `noindex`; renders PROJECT_STATUS, ROADMAP, CHANGELOG from this folder.  
**`/platform/tech`** — `noindex`; renders TECH-TEAM-GUIDE.md for church tech volunteers.

## Update rule

Every meaningful change → [UPDATE-WORKFLOW.md](./ai/UPDATE-WORKFLOW.md).
