You are the build-stage senior-developer agent, invoked automatically by
`/run` because GitHub CI reported a **code/test failure** on the pull
request this feature just opened. Every task's code is already committed
and the PR already exists -- this is not a fresh build and not a review.
Your job is to make the failing CI check pass.

Repo root: /Users/eladzoarets/.cache/sdlc/sprint-worktrees/sdlc-sprint-TXT-17481560-01-bootstrap-agent-workspace-application-051da96b/worktree/features/TXT-17481560-01-bootstrap-agent-workspace-application/.sdlc-runtime/branching/worktrees/agent-workspace/feature/TXT-17481560-01-bootstrap-agent-workspace-application
Pull request: #1 (https://github.com/EladZoarets/agent-workspace/pull/1)
Branch: feature/TXT-17481560-01-bootstrap-agent-workspace-application
Head commit under test: a44c17351668f9e0ae04a56b60c93bdc6f2b28e2
Fix attempt: 1/3

## Failing required checks

- **verify** (workflow `CI`) — https://github.com/EladZoarets/agent-workspace/actions/runs/44890960058/job/136806439847

## Failure logs (gh run view --log-failed, truncated)

```text
verify	Run npm run lint	﻿2026-11-21T09:44:19.5661743Z ##[group]Run npm run lint
verify	Run npm run lint	2026-11-21T09:44:19.5662154Z [36;1mnpm run lint[0m
verify	Run npm run lint	2026-11-21T09:44:19.5699425Z shell: /usr/bin/bash -e {0}
verify	Run npm run lint	2026-11-21T09:44:19.5699762Z ##[endgroup]
verify	Run npm run lint	2026-11-21T09:44:19.6936653Z 
verify	Run npm run lint	2026-11-21T09:44:19.6956788Z > agent-workspace@0.0.0 lint
verify	Run npm run lint	2026-11-21T09:44:19.6971066Z > npm run lint --workspaces --if-present
verify	Run npm run lint	2026-11-21T09:44:19.6979693Z 
verify	Run npm run lint	2026-11-21T09:44:19.8666468Z 
verify	Run npm run lint	2026-11-21T09:44:19.8692245Z > @agent-workspace/api@0.0.0 lint
verify	Run npm run lint	2026-11-21T09:44:19.8706559Z > oxlint
verify	Run npm run lint	2026-11-21T09:44:19.8726345Z 
verify	Run npm run lint	2026-11-21T09:44:19.9160754Z file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:469
verify	Run npm run lint	2026-11-21T09:44:19.9170829Z 		let error = /* @__PURE__ */ Error("Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.");
verify	Run npm run lint	2026-11-21T09:44:19.9172692Z 		                            ^
verify	Run npm run lint	2026-11-21T09:44:19.9173049Z 
verify	Run npm run lint	2026-11-21T09:44:19.9174426Z Error: Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
verify	Run npm run lint	2026-11-21T09:44:19.9176211Z     at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:469:31
verify	Run npm run lint	2026-11-21T09:44:19.9177165Z     at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
verify	Run npm run lint	2026-11-21T09:44:19.9177873Z     at async node:internal/modules/esm/loader:647:26
verify	Run npm run lint	2026-11-21T09:44:19.9178674Z     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9179585Z   cause: Error: Cannot find module '@oxlint/binding-wasm32-wasi'
verify	Run npm run lint	2026-11-21T09:44:19.9180253Z   Require stack:
verify	Run npm run lint	2026-11-21T09:44:19.9181050Z   - /home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js
verify	Run npm run lint	2026-11-21T09:44:19.9182192Z       at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:402:15
verify	Run npm run lint	2026-11-21T09:44:19.9183057Z       ... 5 lines matching cause stack trace ...
verify	Run npm run lint	2026-11-21T09:44:19.9183855Z       at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9184711Z     cause: Error: Cannot find module './oxlint.wasi.cjs'
verify	Run npm run lint	2026-11-21T09:44:19.9185234Z     Require stack:
verify	Run npm run lint	2026-11-21T09:44:19.9186080Z     - /home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js
verify	Run npm run lint	2026-11-21T09:44:19.9187229Z         at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:402:15
verify	Run npm run lint	2026-11-21T09:44:19.9188113Z         ... 5 lines matching cause stack trace ...
verify	Run npm run lint	2026-11-21T09:44:19.9188878Z         at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9189885Z       cause: Error: Cannot find module '@oxlint/binding-linux-x64-gnu'
verify	Run npm run lint	2026-11-21T09:44:19.9190514Z       Require stack:
verify	Run npm run lint	2026-11-21T09:44:19.9191273Z       - /home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js
verify	Run npm run lint	2026-11-21T09:44:19.9192429Z           at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:402:15
verify	Run npm run lint	2026-11-21T09:44:19.9193354Z           ... 5 lines matching cause stack trace ...
verify	Run npm run lint	2026-11-21T09:44:19.9194196Z           at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9195110Z         cause: Error: Cannot find module './oxlint.linux-x64-gnu.node'
verify	Run npm run lint	2026-11-21T09:44:19.9195737Z         Require stack:
verify	Run npm run lint	2026-11-21T09:44:19.9196973Z         - /home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js
verify	Run npm run lint	2026-11-21T09:44:19.9198152Z             at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:402:15
verify	Run npm run lint	2026-11-21T09:44:19.9199044Z             at Array.reduce (<anonymous>)
verify	Run npm run lint	2026-11-21T09:44:19.9200091Z             at createLoadErrorChain (file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:395:16)
verify	Run npm run lint	2026-11-21T09:44:19.9201719Z             at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:470:23
verify	Run npm run lint	2026-11-21T09:44:19.9202725Z             at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
verify	Run npm run lint	2026-11-21T09:44:19.9203467Z             at async node:internal/modules/esm/loader:647:26
verify	Run npm run lint	2026-11-21T09:44:19.9204338Z             at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9205076Z           cause: null
verify	Run npm run lint	2026-11-21T09:44:19.9205509Z         }
verify	Run npm run lint	2026-11-21T09:44:19.9206087Z       }
verify	Run npm run lint	2026-11-21T09:44:19.9206475Z     }
verify	Run npm run lint	2026-11-21T09:44:19.9206873Z   }
verify	Run npm run lint	2026-11-21T09:44:19.9207248Z }
verify	Run npm run lint	2026-11-21T09:44:19.9226234Z 
verify	Run npm run lint	2026-11-21T09:44:19.9241166Z Node.js v24.22.3
verify	Run npm run lint	2026-11-21T09:44:19.9255132Z npm error Lifecycle script `lint` failed with error:
verify	Run npm run lint	2026-11-21T09:44:19.9257261Z npm error code 1
verify	Run npm run lint	2026-11-21T09:44:19.9272834Z npm error path /home/runner/work/agent-workspace/agent-workspace/apps/api
verify	Run npm run lint	2026-11-21T09:44:19.9273414Z 
verify	Run npm run lint	2026-11-21T09:44:19.9274081Z npm error workspace @agent-workspace/api@0.0.0
verify	Run npm run lint	2026-11-21T09:44:19.9274730Z > @agent-workspace/web@0.0.0 lint
verify	Run npm run lint	2026-11-21T09:44:19.9276060Z npm error location /home/runner/work/agent-workspace/agent-workspace/apps/api
verify	Run npm run lint	2026-11-21T09:44:19.9276774Z > oxlint
verify	Run npm run lint	2026-11-21T09:44:19.9277507Z npm error command failed
verify	Run npm run lint	2026-11-21T09:44:19.9277691Z 
verify	Run npm run lint	2026-11-21T09:44:19.9278088Z npm error command sh -c oxlint
verify	Run npm run lint	2026-11-21T09:44:19.9278448Z 
verify	Run npm run lint	2026-11-21T09:44:19.9655277Z file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:469
verify	Run npm run lint	2026-11-21T09:44:19.9664161Z 		let error = /* @__PURE__ */ Error("Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.");
verify	Run npm run lint	2026-11-21T09:44:19.9665769Z 		                            ^
verify	Run npm run lint	2026-11-21T09:44:19.9666311Z 
verify	Run npm run lint	2026-11-21T09:44:19.9667648Z Error: Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
verify	Run npm run lint	2026-11-21T09:44:19.9669257Z     at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:469:31
verify	Run npm run lint	2026-11-21T09:44:19.9670212Z     at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
verify	Run npm run lint	2026-11-21T09:44:19.9670907Z     at async node:internal/modules/esm/loader:647:26
verify	Run npm run lint	2026-11-21T09:44:19.9671710Z     at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9672566Z   cause: Error: Cannot find module '@oxlint/binding-wasm32-wasi'
verify	Run npm run lint	2026-11-21T09:44:19.9673206Z   Require stack:
verify	Run npm run lint	2026-11-21T09:44:19.9674003Z   - /home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js
verify	Run npm run lint	2026-11-21T09:44:19.9675140Z       at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:402:15
verify	Run npm run lint	2026-11-21T09:44:19.9676191Z       ... 5 lines matching cause stack trace ...
verify	Run npm run lint	2026-11-21T09:44:19.9677182Z       at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9678048Z     cause: Error: Cannot find module './oxlint.wasi.cjs'
verify	Run npm run lint	2026-11-21T09:44:19.9678601Z     Require stack:
verify	Run npm run lint	2026-11-21T09:44:19.9679300Z     - /home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js
verify	Run npm run lint	2026-11-21T09:44:19.9680455Z         at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:402:15
verify	Run npm run lint	2026-11-21T09:44:19.9681332Z         ... 5 lines matching cause stack trace ...
verify	Run npm run lint	2026-11-21T09:44:19.9682102Z         at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9683079Z       cause: Error: Cannot find module '@oxlint/binding-linux-x64-gnu'
verify	Run npm run lint	2026-11-21T09:44:19.9683712Z       Require stack:
verify	Run npm run lint	2026-11-21T09:44:19.9684469Z       - /home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js
verify	Run npm run lint	2026-11-21T09:44:19.9686067Z           at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:402:15
verify	Run npm run lint	2026-11-21T09:44:19.9686973Z           ... 5 lines matching cause stack trace ...
verify	Run npm run lint	2026-11-21T09:44:19.9687810Z           at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9688736Z         cause: Error: Cannot find module './oxlint.linux-x64-gnu.node'
verify	Run npm run lint	2026-11-21T09:44:19.9689368Z         Require stack:
verify	Run npm run lint	2026-11-21T09:44:19.9690154Z         - /home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js
verify	Run npm run lint	2026-11-21T09:44:19.9691342Z             at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:402:15
verify	Run npm run lint	2026-11-21T09:44:19.9692376Z             at Array.reduce (<anonymous>)
verify	Run npm run lint	2026-11-21T09:44:19.9693431Z             at createLoadErrorChain (file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:395:16)
verify	Run npm run lint	2026-11-21T09:44:19.9694776Z             at file:///home/runner/work/agent-workspace/agent-workspace/node_modules/oxlint/dist/bindings.js:470:23
verify	Run npm run lint	2026-11-21T09:44:19.9695776Z             at ModuleJob.run (node:internal/modules/esm/module_job:561:25)
verify	Run npm run lint	2026-11-21T09:44:19.9696649Z             at async node:internal/modules/esm/loader:647:26
verify	Run npm run lint	2026-11-21T09:44:19.9697453Z             at async asyncRunEntryPointWithESMLoader (node:internal/modules/run_main:101:5) {
verify	Run npm run lint	2026-11-21T09:44:19.9698143Z           cause: null
verify	Run npm run lint	2026-11-21T09:44:19.9698557Z         }
verify	Run npm run lint	2026-11-21T09:44:19.9698930Z       }
verify	Run npm run lint	2026-11-21T09:44:19.9699287Z     }
verify	Run npm run lint	2026-11-21T09:44:19.9699646Z   }
verify	Run npm run lint	2026-11-21T09:44:19.9700018Z }
verify	Run npm run lint	2026-11-21T09:44:19.9700310Z 
verify	Run npm run lint	2026-11-21T09:44:19.9700577Z Node.js v24.22.3
verify	Run npm run lint	2026-11-21T09:44:19.9712168Z npm error Lifecycle script `lint` failed with error:
verify	Run npm run lint	2026-11-21T09:44:19.9726343Z npm error code 1
verify	Run npm run lint	2026-11-21T09:44:19.9736554Z npm error path /home/runner/work/agent-workspace/agent-workspace/apps/web
verify	Run npm run lint	2026-11-21T09:44:19.9746592Z npm error workspace @agent-workspace/web@0.0.0
verify	Run npm run lint	2026-11-21T09:44:19.9747536Z npm error location /home/runner/work/agent-workspace/agent-workspace/apps/web
verify	Run npm run lint	2026-11-21T09:44:19.9748262Z npm error command failed
verify	Run npm run lint	2026-11-21T09:44:19.9748813Z npm error command sh -c oxlint
verify	Run npm run lint	2026-11-21T09:44:19.9887546Z ##[error]Process completed with exit code 1.

```

## What to do

1. Reproduce the failure locally where practical, using the same command
   the CI step ran.
2. Fix the **root cause** in production code or in the test, whichever is
   genuinely wrong. Do not delete, skip, `xfail`, or weaken a test to make
   CI green -- that is the one outcome this loop must never produce.
3. Keep the change minimal and scoped to the failure above. Do not
   refactor unrelated passing code, and do not touch CI configuration to
   make a check stop running.
4. Run the relevant local test slice to confirm the fix. Do NOT run the
   repository's full test suite.
5. Stage your changes (`git add`) but do **not** commit and do **not**
   push -- `/run` commits and pushes for you, then waits for CI again.

## Response contract

Write your summary to:

/Users/eladzoarets/.cache/sdlc/sprint-worktrees/sdlc-sprint-TXT-17481560-01-bootstrap-agent-workspace-application-051da96b/worktree/features/TXT-17481560-01-bootstrap-agent-workspace-application/pr-checks/ci-fix-pr1-attempt-1-a44c173.md

Include:

- `Root cause:` one or two sentences on why the check failed.
- `Fix:` what you changed and why it addresses the root cause.
- `Validation:` the exact command(s) you ran and their result.
- `Files changed:` a bullet per file.

If you conclude the failure is NOT a code defect (an infrastructure or
flaky failure that was misclassified), say so explicitly under a
`Not a code failure:` heading, change nothing, and stage nothing.
