---
id: T-02
title: Connect web shell to API with status indicator, proxy and tests
owner: ''
status: done
solution: default
depends_on:
- T-01
complexity: L
complexity_rationale: Touches web config, new client and component, layout, test tooling
  and the lockfile migration on very new Vite 8/TS 7/React 19.3 versions with peer-compat
  uncertainty.
files:
- verb: create
  path: agent-workspace/package-lock.json
- verb: delete
  path: agent-workspace/apps/web/package-lock.json
- verb: modify
  path: agent-workspace/apps/web/package.json
- verb: modify
  path: agent-workspace/apps/web/vite.config.ts
- verb: modify
  path: agent-workspace/apps/web/index.html
- verb: create
  path: agent-workspace/apps/web/.env.example
- verb: create
  path: agent-workspace/apps/web/src/lib/api.ts
- verb: create
  path: agent-workspace/apps/web/src/components/api-status.tsx
- verb: modify
  path: agent-workspace/apps/web/src/components/layout.tsx
- verb: create
  path: agent-workspace/apps/web/src/lib/api.test.ts
- verb: create
  path: agent-workspace/apps/web/src/app.test.tsx
- verb: verify
  path: agent-workspace/apps/web/src/App.tsx
- verb: verify
  path: agent-workspace/apps/web/src/main.tsx
data_changes:
- kind: setting
  target: VITE_API_BASE_URL
  environments:
  - dev
  rollback: unset to use the default
- kind: setting
  target: API_PROXY_TARGET
  environments:
  - dev
  rollback: unset to use the default
definition_of_done:
- Header shows Checking API, API online or API offline; every failure shape maps to
  offline and unmount/StrictMode cause no stale state
- index.html declares lang=en and dir=ltr; Vite proxies /api to the API with the prefix
  stripped
- Web tests (api client and shell smoke) pass in jsdom, and tsc -b typechecks the
  test files
- Root package-lock.json exists, apps/web/package-lock.json is deleted, and npm ci
  at the root passes with web runtime versions unchanged
tests:
- test_fetch_health_resolves_on_ok_body
- test_fetch_health_calls_api_health_by_default
- test_api_base_url_strips_trailing_slash
- test_fetch_health_rejects_on_non_2xx
- test_fetch_health_rejects_on_wrong_status_body
- test_fetch_health_rejects_on_invalid_json
- test_fetch_health_rejects_on_network_error
- test_fetch_health_rejects_when_signal_aborted
- test_shell_renders_brand_and_agents_heading
- test_api_status_shows_checking_before_response
- test_api_status_shows_online_when_health_ok
- test_api_status_shows_offline_when_fetch_rejects
- test_api_status_shows_offline_on_non_2xx_or_bad_body
- test_api_status_ignores_result_after_unmount
- test_api_status_stable_under_strict_mode_double_mount
- test_api_status_stays_checking_while_request_hangs
- test_index_html_declares_lang_en_and_dir_ltr
- test_vite_dev_proxy_forwards_api_prefix_stripped
- test_web_and_api_packages_expose_typecheck_and_test_scripts
- test_web_typecheck_passes_with_test_files_included
- test_vitest_runs_in_jsdom_for_web
- test_workspace_lockfile_installs_cleanly_with_npm_ci
wave: 1
chaos_status: skipped
---

## Scope
Make the web shell reach the API: client, `ApiStatus` header indicator, dev proxy, LTR attribute, Vitest/jsdom setup with tests, and migrate to the single root lockfile.

## Approach
Follow plan steps 2, 9-17. `fetchHealth` is the only place knowing the base URL (`VITE_API_BASE_URL` default `/api`, trailing slash stripped). `ApiStatus` uses AbortController in `useEffect`, skips state on abort, exports only the component. Mount it in `Layout` header; on small screens show the dot with sr-only text. Add `/api` proxy (rewrite strips prefix, `API_PROXY_TARGET` override) and `test: { environment: 'jsdom' }` to vite config; if the `vitest/config` reference fails under tsconfig.node, fall back to `vitest.config.ts`. Import Vitest APIs explicitly; if `node:fs` types fail, use `index.html?raw`. Delete the web lockfile, run root `npm install`, compare resolved web versions and pin any that moved.

## Acceptance Criteria
- AC2: shell renders English/LTR and header reflects API reachability via `/health`.
- AC3: web typecheck and test scripts pass; root lockfile supports `npm ci`.

## Notes
Proxy behaviour is verified via config assertion plus the manual dev run in plan Test Plan. `App.tsx` and `main.tsx` stay unchanged.
