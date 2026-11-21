# Task summary

## T-01 — Bootstrap npm workspace root and Fastify health API

- Depends on: none
- Files changed: agent-workspace/package.json, agent-workspace/.nvmrc, agent-workspace/.gitignore, agent-workspace/apps/api/package.json, agent-workspace/apps/api/tsconfig.json, agent-workspace/apps/api/tsconfig.build.json, agent-workspace/apps/api/.oxlintrc.json, agent-workspace/apps/api/src/app.ts, agent-workspace/apps/api/src/server.ts, agent-workspace/apps/api/test/health.test.ts
- Main behavior: Create the root npm workspace (`package.json`, `.nvmrc`, `.gitignore` additions) and the `apps/api` Fastify + TypeScript package serving `GET /health`, with its own smoke tests.

## T-02 — Connect web shell to API with status indicator, proxy and tests

- Depends on: T-01
- Files changed: agent-workspace/package-lock.json, agent-workspace/apps/web/package-lock.json, agent-workspace/apps/web/package.json, agent-workspace/apps/web/vite.config.ts, agent-workspace/apps/web/index.html, agent-workspace/apps/web/.env.example, agent-workspace/apps/web/src/lib/api.ts, agent-workspace/apps/web/src/components/api-status.tsx, agent-workspace/apps/web/src/components/layout.tsx, agent-workspace/apps/web/src/lib/api.test.ts, agent-workspace/apps/web/src/app.test.tsx, agent-workspace/apps/web/src/App.tsx, agent-workspace/apps/web/src/main.tsx
- Main behavior: Make the web shell reach the API: client, `ApiStatus` header indicator, dev proxy, LTR attribute, Vitest/jsdom setup with tests, and migrate to the single root lockfile.

## T-03 — Add CI workflow with AC4 guard and update README

- Depends on: T-02
- Files changed: agent-workspace/.github/workflows/ci.yml, agent-workspace/README.md, agent-workspace/apps/api/test/ci-workflow.test.ts
- Main behavior: Add `.github/workflows/ci.yml` and rewrite the README for the workspace flow.

