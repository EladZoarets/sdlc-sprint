---
id: T-03
title: Add CI workflow with AC4 guard and update README
owner: ''
status: done
solution: default
depends_on:
- T-02
complexity: S
complexity_rationale: One workflow file and README rewrite using standard steps; depends
  only on the root scripts and lockfile existing.
files:
- verb: create
  path: agent-workspace/.github/workflows/ci.yml
- verb: modify
  path: agent-workspace/README.md
- verb: create
  path: agent-workspace/apps/api/test/ci-workflow.test.ts
definition_of_done:
- 'CI runs on push to main and pull_request: checkout, setup-node from .nvmrc with
  npm cache, npm ci, lint, typecheck, build, test, then the AC4 guard in that order'
- AC4 guard fails with the message SDLC plugin files must not be committed for tracked
  dev-sdlc, .claude-plugin, .sdlc-runtime or .sdlc paths, and ignores lookalike paths;
  guard tests verified by a local shell run
- README documents root install, dev:api and dev:web, scripts table, GET /health,
  PORT/HOST, CI and the updated project structure
tests:
- test_ci_workflow_runs_lint_typecheck_build_test_in_order
- test_ci_uses_node_version_file_and_npm_cache
- test_ci_guard_passes_when_no_sdlc_paths_tracked
- test_ci_guard_fails_when_sdlc_path_tracked
- test_ci_guard_ignores_lookalike_paths
wave: 2
chaos_status: skipped
---

## Scope
Add `.github/workflows/ci.yml` and rewrite the README for the workspace flow.

## Approach
Also add `apps/api/test/ci-workflow.test.ts` (scope addition not in plan Files to Change): a vitest test that reads `.github/workflows/ci.yml`, asserts step order and node-version-file/npm cache, and runs the guard regex against sample path lists (pass, fail, lookalike).

Follow plan steps 18 and 20. Permissions `contents: read`, runner `ubuntu-latest`. Guard step uses the anchored regex `(^|/)(dev-sdlc|\.claude-plugin|\.sdlc-runtime|\.sdlc)/` over `git ls-files`. README keeps the Routes table and shadcn section (`cd apps/web && npx shadcn@latest add`), notes TanStack Query comes with the first data endpoint.

## Acceptance Criteria
- AC1: README documents runnable startup commands.
- AC3: CI runs lint, typecheck, build and test.
- AC4: CI blocks tracked SDLC plugin paths.

## Notes
Skeletons for the workflow are verified by inspecting the workflow and exercising the guard shell snippet locally; a real runner result cannot be asserted.
