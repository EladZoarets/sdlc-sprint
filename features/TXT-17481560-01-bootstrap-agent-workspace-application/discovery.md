---
feature_id: TXT-17481560-01-bootstrap-agent-workspace-application
generated_at: '2026-11-21T08:44:17.525034+00:00'
discovery_version: 1
questions_asked: 3
questions_answered: 0
---

## Synthesis for Architect

The `agent-workspace` repo is not empty: `apps/web` already has a Vite, React, Tailwind v4 and oxlint scaffold, so the real work is the backend `apps/api` with a `/health` route, web-to-API wiring, CI, a smoke test and docs. Reuse the web scaffold instead of recreating it, and add `dir="ltr"` and a standalone `typecheck` script to it. No backend sibling exists to mirror, so the three open choices (backend framework, monorepo wiring, smoke-test tooling) were not put to the developer under --auto. They are recorded below as assumptions and the architect may substitute equivalents. Keep the smallest viable scope: npm workspaces, Fastify, Vitest with Testing Library and an API health test, and no browser in CI. Web package versions are unusually new, so confirm they install in CI. AC4 has no guard specified, so keep plugin code out of the repo and consider a lightweight check.

## Codebase Context

- `apps/web/package.json` — standalone npm project (`@agent-workspace/web`); needs `typecheck` and `test` scripts
- `apps/web/index.html` — `<html lang="en">` lacks `dir="ltr"`
- `apps/web/vite.config.ts` — add dev proxy or env base URL for the API, plus test config
- `apps/web/src/App.tsx` — routes under `Layout`; default export only for `App`
- `apps/web/src/components/layout.tsx` — shell header "Agent Workspace"; place for `/health` status
- `apps/web/src/pages/home.tsx` — candidate spot for health reachability UI
- `apps/web/src/lib/utils.ts` — `cn` helper; new health client belongs alongside in `src/lib/`
- `README.md` — documents web-only startup; needs API, CI and workspace docs
- Patterns: kebab-case files, named exports, `@/` alias imports, Tailwind v4 utilities
- Missing today: root `package.json`, `apps/api`, `.github/workflows/ci.yml`, any tests

## Confluence Context

## Epic Constraints

## Sprint Context

## Developer Profile Applied

## Prior Art

## Gap Analysis

### Auto-Closed Gaps

- AC4: no SDLC plugin code copied into the product repository → source: spec.md AC#4
- AC2: English/LTR shell; add `dir="ltr"` to the existing `lang="en"` html element in `apps/web/index.html` → source: Explore
- AC1: reuse the existing `apps/web` scaffold (Vite, React, Tailwind v4, oxlint) rather than recreating it → source: Explore
- AC3: add a standalone typecheck script (`tsc -b`) alongside the existing lint and build scripts → source: Explore
- How web reaches the API `/health` in dev (Vite proxy vs env base URL) and the API port → source: trivial

### Questions Asked & Answered

Three open questions were not asked because --auto is on. Each is recorded under `## Assumptions under --auto`.

- Backend language and framework for `apps/api`
- Monorepo wiring (npm workspaces vs pnpm vs turbo/nx vs per-app projects)
- Smoke-test tooling and whether CI runs a browser

## Assumptions under --auto

- Assumed under --auto: Backend: Node/TypeScript with Fastify (matches the existing TypeScript stack; architect may substitute an equivalent minimal framework)
- Assumed under --auto: Monorepo wiring: npm workspaces with a root package.json and single lockfile (extends the existing npm setup, no heavier tooling)
- Assumed under --auto: Smoke test: Vitest + Testing Library for web plus an API /health test, no browser in CI (smallest viable scope)
