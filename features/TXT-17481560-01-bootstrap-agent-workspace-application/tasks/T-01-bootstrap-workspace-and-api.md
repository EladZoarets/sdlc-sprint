---
id: T-01
title: Bootstrap npm workspace root and Fastify health API
owner: ''
status: done
solution: default
depends_on: []
complexity: M
complexity_rationale: New Fastify package with tsconfigs, lint config and real-port
  tests on a new toolchain version set (TS 7, Vitest); no existing pattern in the
  repo for the API side.
files:
- verb: create
  path: agent-workspace/package.json
- verb: create
  path: agent-workspace/.nvmrc
- verb: modify
  path: agent-workspace/.gitignore
- verb: create
  path: agent-workspace/apps/api/package.json
- verb: create
  path: agent-workspace/apps/api/tsconfig.json
- verb: create
  path: agent-workspace/apps/api/tsconfig.build.json
- verb: create
  path: agent-workspace/apps/api/.oxlintrc.json
- verb: create
  path: agent-workspace/apps/api/src/app.ts
- verb: create
  path: agent-workspace/apps/api/src/server.ts
- verb: create
  path: agent-workspace/apps/api/test/health.test.ts
data_changes:
- kind: setting
  target: PORT
  environments:
  - dev
  rollback: unset to use the default
- kind: setting
  target: HOST
  environments:
  - dev
  rollback: unset to use the default
definition_of_done:
- Root package.json declares workspaces apps/* and dev:web, dev:api, lint, typecheck,
  build, test scripts with if-present aggregation
- GET /health returns 200 {"status":"ok"} JSON; unknown routes and /api/health return
  404
- API tests pass (inject and real port-0 listen plus fetch) and API lint, typecheck
  and build succeed with dist containing no test files
- .gitignore ignores .sdlc-runtime/ and coverage/ while .env.example stays tracked
tests:
- test_build_app_serves_requests_on_real_listening_port
- test_build_app_returns_independent_instances
- test_root_package_declares_workspaces_and_dev_scripts
- test_root_aggregate_scripts_skip_packages_without_script
- test_health_returns_200_with_status_ok_json
- test_health_reachable_over_real_http_on_port_zero
- test_unknown_route_returns_404
- test_health_route_is_not_prefixed_with_api
- test_health_rejects_non_get_methods
- test_api_build_emits_only_src_to_dist
- test_gitignore_excludes_sdlc_runtime_and_coverage
wave: 0
chaos_status: skipped
---

## Scope
Create the root npm workspace (`package.json`, `.nvmrc`, `.gitignore` additions) and the `apps/api` Fastify + TypeScript package serving `GET /health`, with its own smoke tests.

## Approach
Follow plan Implementation Steps 1, 3-8 and 19. Root scripts aggregate with `npm run <x> --workspaces --if-present`. `buildApp()` factory in `src/app.ts` registers only `/health` (no CORS, no prefix); `src/server.ts` reads PORT (fallback 3001 when non-finite) and HOST (127.0.0.1), exits 1 on listen failure. `tsconfig.build.json` emits `src` only. Tests cover inject, real listen on port 0, 404, `/api/health` 404, POST rejection and two simultaneous instances. Lockfile is produced in T-02.

## Acceptance Criteria
- AC1: API service runnable via `npm run dev:api` from the root; root scripts documented by existing scripts.
- AC2: `/health` returns 200 `{"status":"ok"}`.
- AC3: API lint, typecheck, build and test scripts exist and pass.
- AC4: `.sdlc-runtime/` and `coverage/` are git-ignored.

## Notes
Fastify ^5 and Vitest versions are assumed; confirm at build. Use `.js` extensions on relative imports (nodenext).
