---
qa_input_hash: 9104483ecafd42636a131c71691128cb57c3c1c7826aea13a85c625c53a59fed
---
## AC#1 — Runnable apps/web and backend service with documented local startup commands

- **test_build_app_serves_requests_on_real_listening_port** (pending) — the API factory boots a real server on an ephemeral port and answers over the network.
  - ac: 1
  - sut: buildApp
  - behavior: After listening on port 0 at 127.0.0.1, a real fetch to the bound port receives an HTTP response, and the server closes cleanly afterwards.
  - entry_point: agent-workspace/apps/api/src/app.ts#buildApp

- **test_build_app_returns_independent_instances** (pending) — calling the factory twice yields isolated apps so tests and the server never share state.
  - ac: 1
  - sut: buildApp
  - behavior: Two instances from buildApp can listen on different ephemeral ports at the same time without conflict.
  - entry_point: agent-workspace/apps/api/src/app.ts#buildApp

- **test_root_package_declares_workspaces_and_dev_scripts** (pending) — the root package wires both apps and exposes the documented start commands.
  - ac: 1
  - sut: root package.json workspaces and scripts
  - behavior: The root package lists the apps/* workspaces and defines dev:web, dev:api, lint, typecheck, build and test scripts.
  - entry_point: agent-workspace/package.json#scripts

- **test_root_aggregate_scripts_skip_packages_without_script** (pending) — aggregate scripts use if-present semantics (from plan §Implementation Steps).
  - ac: 1
  - sut: root package.json scripts
  - behavior: Running an aggregate script such as test from the root does not fail for a workspace that lacks that script.
  - entry_point: agent-workspace/package.json#scripts

## AC#2 — Web app renders an English/LTR shell and can reach /health on the API

- **test_health_returns_200_with_status_ok_json** (pending) — GET /health via inject.
  - ac: 2
  - sut: buildApp
  - behavior: GET /health returns HTTP 200, an application/json content type, and body {"status":"ok"}.
  - entry_point: agent-workspace/apps/api/src/app.ts#buildApp

- **test_health_reachable_over_real_http_on_port_zero** (pending) — real listen plus real fetch.
  - ac: 2
  - sut: buildApp
  - behavior: A real fetch to /health on the ephemeral port returns 200 with {"status":"ok"}.
  - entry_point: agent-workspace/apps/api/src/app.ts#buildApp

- **test_unknown_route_returns_404** (pending) — unknown path is not swallowed by /health.
  - ac: 2
  - sut: buildApp
  - behavior: GET /nope returns HTTP 404.
  - entry_point: agent-workspace/apps/api/src/app.ts#buildApp

- **test_health_route_is_not_prefixed_with_api** (pending) — the proxy strips /api, so the API route must stay /health (from plan §Risks).
  - ac: 2
  - sut: buildApp
  - behavior: GET /api/health directly on the API returns 404 while GET /health returns 200.
  - entry_point: agent-workspace/apps/api/src/app.ts#buildApp

- **test_health_rejects_non_get_methods** (pending) — only GET is registered.
  - ac: 2
  - sut: buildApp
  - behavior: POST /health returns a 404 or 405 response and not 200.
  - entry_point: agent-workspace/apps/api/src/app.ts#buildApp

- **test_fetch_health_resolves_on_ok_body** (pending) — happy path of the client.
  - ac: 2
  - sut: fetchHealth
  - behavior: With fetch returning 200 and {status:'ok'}, fetchHealth resolves {status:'ok'}.
  - entry_point: agent-workspace/apps/web/src/lib/api.ts#fetchHealth

- **test_fetch_health_calls_api_health_by_default** (pending) — default base URL.
  - ac: 2
  - sut: fetchHealth, API_BASE_URL
  - behavior: Without VITE_API_BASE_URL set, fetch is called with the URL /api/health.
  - entry_point: agent-workspace/apps/web/src/lib/api.ts#fetchHealth

- **test_api_base_url_strips_trailing_slash** (pending) — base URL normalization (from plan §Implementation Steps).
  - ac: 2
  - sut: API_BASE_URL
  - behavior: A configured base URL ending in "/" produces a request URL without a doubled slash before health.
  - entry_point: agent-workspace/apps/web/src/lib/api.ts#API_BASE_URL

- **test_fetch_health_rejects_on_non_2xx** (pending) — 500 response.
  - ac: 2
  - sut: fetchHealth
  - behavior: With fetch returning HTTP 500, fetchHealth rejects.
  - entry_point: agent-workspace/apps/web/src/lib/api.ts#fetchHealth

- **test_fetch_health_rejects_on_wrong_status_body** (pending) — 200 with {status:'down'}.
  - ac: 2
  - sut: fetchHealth
  - behavior: With a 200 response whose body status is not "ok", fetchHealth rejects.
  - entry_point: agent-workspace/apps/web/src/lib/api.ts#fetchHealth

- **test_fetch_health_rejects_on_invalid_json** (pending) — body is not JSON.
  - ac: 2
  - sut: fetchHealth
  - behavior: With a 200 response whose body cannot be parsed as JSON, fetchHealth rejects.
  - entry_point: agent-workspace/apps/web/src/lib/api.ts#fetchHealth

- **test_fetch_health_rejects_on_network_error** (pending) — fetch itself throws.
  - ac: 2
  - sut: fetchHealth
  - behavior: When fetch rejects with a network error, fetchHealth rejects.
  - entry_point: agent-workspace/apps/web/src/lib/api.ts#fetchHealth

- **test_fetch_health_rejects_when_signal_aborted** (pending) — abort propagation (from plan §Risks).
  - ac: 2
  - sut: fetchHealth
  - behavior: An already-aborted AbortSignal causes fetchHealth to reject.
  - entry_point: agent-workspace/apps/web/src/lib/api.ts#fetchHealth

- **test_shell_renders_brand_and_agents_heading** (pending) — shell renders with a healthy API.
  - ac: 2
  - sut: App, Layout
  - behavior: Rendering App in a MemoryRouter shows a banner containing "Agent Workspace" and an "Agents" heading.
  - entry_point: agent-workspace/apps/web/src/App.tsx#App

- **test_api_status_shows_checking_before_response** (pending) — initial state.
  - ac: 2
  - sut: ApiStatus
  - behavior: Before the health request settles, the status element reads "Checking API…".
  - entry_point: agent-workspace/apps/web/src/components/api-status.tsx#ApiStatus

- **test_api_status_shows_online_when_health_ok** (pending) — header indicator, online.
  - ac: 2
  - sut: ApiStatus
  - behavior: With fetch stubbed to {status:'ok'}, the header status reads "API online".
  - entry_point: agent-workspace/apps/web/src/components/api-status.tsx#ApiStatus

- **test_api_status_shows_offline_when_fetch_rejects** (pending) — header indicator, offline.
  - ac: 2
  - sut: ApiStatus
  - behavior: With fetch rejecting, the header status reads "API offline" and the rest of the shell still renders.
  - entry_point: agent-workspace/apps/web/src/components/api-status.tsx#ApiStatus

- **test_api_status_shows_offline_on_non_2xx_or_bad_body** (pending) — every failure shape maps to offline (from plan §Risks).
  - ac: 2
  - sut: ApiStatus
  - behavior: A 500 response and a 200 response with a wrong body each produce "API offline".
  - entry_point: agent-workspace/apps/web/src/components/api-status.tsx#ApiStatus

- **test_api_status_ignores_result_after_unmount** (pending) — unmount mid-request (from plan §Risks).
  - ac: 2
  - sut: ApiStatus
  - behavior: Unmounting before the request settles aborts the request and causes no state update or React warning.
  - entry_point: agent-workspace/apps/web/src/components/api-status.tsx#ApiStatus

- **test_api_status_stable_under_strict_mode_double_mount** (pending) — StrictMode mounts the effect twice (from plan §Risks).
  - ac: 2
  - sut: ApiStatus
  - behavior: Under StrictMode the final status matches the last response and is not stuck offline from the aborted first request.
  - entry_point: agent-workspace/apps/web/src/components/api-status.tsx#ApiStatus

- **test_api_status_stays_checking_while_request_hangs** (pending) — hanging API (from plan §Risks).
  - ac: 2
  - sut: ApiStatus
  - behavior: While fetch never settles, the status remains "Checking API…" and does not flip to offline.
  - entry_point: agent-workspace/apps/web/src/components/api-status.tsx#ApiStatus

- **test_index_html_declares_lang_en_and_dir_ltr** (pending) — English/LTR shell attributes.
  - ac: 2
  - sut: apps/web index.html
  - behavior: index.html contains lang="en" and dir="ltr" on the html element.
  - entry_point: agent-workspace/apps/web/index.html#html

- **test_vite_dev_proxy_forwards_api_prefix_stripped** (pending) — proxy rewrite rule.
  - ac: 2
  - sut: Vite config server.proxy
  - behavior: A request to /api/health on the dev server is forwarded to the API target as /health, with the /api prefix removed.
  - entry_point: agent-workspace/apps/web/vite.config.ts#server.proxy

## AC#3 — Lint, typecheck, build and smoke test succeed in CI

- **test_ci_workflow_runs_lint_typecheck_build_test_in_order** (pending) — the workflow encodes the required gates.
  - ac: 3
  - sut: CI workflow
  - behavior: The workflow triggers on push to main and on pull_request, and runs npm ci, lint, typecheck, build and test steps in that order.
  - entry_point: agent-workspace/.github/workflows/ci.yml#ci

- **test_ci_uses_node_version_file_and_npm_cache** (pending) — Node pinned to .nvmrc.
  - ac: 3
  - sut: CI workflow, .nvmrc
  - behavior: setup-node reads node-version-file .nvmrc, and .nvmrc contains 24.
  - entry_point: agent-workspace/.github/workflows/ci.yml#ci

- **test_workspace_lockfile_installs_cleanly_with_npm_ci** (pending) — single root lockfile, new toolchain peers (from plan §Risks).
  - ac: 3
  - sut: root package-lock.json
  - behavior: npm ci at the repo root exits 0 with no peer-dependency conflict, and apps/web/package-lock.json no longer exists.
  - entry_point: agent-workspace/package-lock.json#packages

- **test_web_and_api_packages_expose_typecheck_and_test_scripts** (pending) — both workspaces participate in the aggregate gates.
  - ac: 3
  - sut: apps/web and apps/api package scripts
  - behavior: Both packages define lint, typecheck, build (api) and test scripts, and the root aggregates run them.
  - entry_point: agent-workspace/apps/api/package.json#scripts

- **test_api_build_emits_only_src_to_dist** (pending) — tsconfig.build excludes tests.
  - ac: 3
  - sut: apps/api build config
  - behavior: The api build produces dist/server.js and dist/app.js and no compiled test files.
  - entry_point: agent-workspace/apps/api/tsconfig.build.json#include

- **test_web_typecheck_passes_with_test_files_included** (pending) — test files under src are typechecked under strict flags (from plan §Risks).
  - ac: 3
  - sut: web tsc -b
  - behavior: tsc -b on apps/web exits 0 with test files present, including the index.html read approach.
  - entry_point: agent-workspace/apps/web/tsconfig.app.json#include

- **test_vitest_runs_in_jsdom_for_web** (pending) — test environment config.
  - ac: 3
  - sut: Vite config test block
  - behavior: vitest run in apps/web executes the smoke tests in a jsdom environment and exits 0.
  - entry_point: agent-workspace/apps/web/vite.config.ts#test

## AC#4 — No SDLC plugin code is copied into the product repository

- **test_ci_guard_passes_when_no_sdlc_paths_tracked** (pending) — guard is green on a clean repo.
  - ac: 4
  - sut: CI AC4 guard step
  - behavior: With no tracked files under dev-sdlc/, .claude-plugin/, .sdlc-runtime/ or .sdlc/, the guard step exits 0.
  - entry_point: agent-workspace/.github/workflows/ci.yml#ac4-guard

- **test_ci_guard_fails_when_sdlc_path_tracked** (pending) — guard negative case.
  - ac: 4
  - sut: CI AC4 guard step
  - behavior: A tracked file under dev-sdlc/ (or each other listed marker) makes the guard step exit 1 with the message "SDLC plugin files must not be committed".
  - entry_point: agent-workspace/.github/workflows/ci.yml#ac4-guard

- **test_ci_guard_ignores_lookalike_paths** (pending) — regex anchoring.
  - ac: 4
  - sut: CI AC4 guard step
  - behavior: A tracked path such as docs/my-dev-sdlc-notes.md does not trigger the guard, while nested sub/dev-sdlc/x does.
  - entry_point: agent-workspace/.github/workflows/ci.yml#ac4-guard

- **test_gitignore_excludes_sdlc_runtime_and_coverage** (pending) — runtime artifacts cannot be accidentally added.
  - ac: 4
  - sut: .gitignore
  - behavior: git check-ignore reports .sdlc-runtime/ and coverage/ as ignored, and .env.example is still not ignored.
  - entry_point: agent-workspace/.gitignore#.sdlc-runtime/

## Missing coverage

- **AC#1 (PORT and HOST handling in the API entry point):** plan.md describes the PORT fallback to 3001 for non-numeric or empty values and the HOST default of 127.0.0.1, and the listen-failure exit(1) path. These live in apps/api/src/server.ts, which plan.md describes as a thin entry point with no exported symbol. No resolvable sut or entry_point exists, so no skeleton was written. Suggest exporting a small config-parsing function, or testing it via a spawned process.
- **AC#1 (README documents startup commands):** documentation content has no code symbol in plan.md. Verify by review (README lists npm install at root, dev:api, dev:web, /health, PORT, HOST).
- **AC#2 (browser-level reachability through the real proxy):** plan.md rules out browser E2E, so the end-to-end header "API online" path is covered only by the manual dev run in plan §Test Plan.
- **AC#2 (hanging API timeout):** plan.md defers AbortSignal.timeout unless requested, so no timeout skeleton exists beyond the stays-checking behavior.
- **AC#3 (CI result on a real runner):** a green GitHub Actions run cannot be asserted from a unit test. The skeletons above cover the workflow definition only.
