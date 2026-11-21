---
id: TXT-17481560
title: 01 - Bootstrap Agent Workspace Application
status: in_progress
owner: null
created: '2026-11-21'
service_repos:
- agent-workspace
parent_jira_id: null
source_type: text
source_kind: spec
source_file: source.md
source_sha256: 1ed82458b88e366cda651021fd998bdc0abcfb7965de2fd512606704090010e1
jira_sync_enabled: false
acceptance_criteria:
- AC1:** Repository contains runnable `apps/web` and backend service with documented
  local startup commands.
- AC2:** Web app renders an initial English/LTR application shell and can reach `/health`
  on the API.
- AC3:** Lint, typecheck, build and smoke test succeed in CI.
- AC4:** No SDLC plugin code is copied into the product repository.
---

# 01 - Bootstrap Agent Workspace Application

## Description

# 01 - Bootstrap Agent Workspace Application

Source: Linear ELA-13 (https://linear.app/elad-tasks/issue/ELA-13/01-bootstrap-agent-workspace-application)

## Implementation

Implement the initial runnable Agent Workspace monorepo in `agent-workspace` with a React + Vite + TypeScript web app and minimal API service. This is an implementation ticket, not a planning exercise.

## Acceptance Criteria (AC)

* **AC1:** Repository contains runnable `apps/web` and backend service with documented local startup commands.
* **AC2:** Web app renders an initial English/LTR application shell and can reach `/health` on the API.
* **AC3:** Lint, typecheck, build and smoke test succeed in CI.
* **AC4:** No SDLC plugin code is copied into the product repository.

## Delivery

Working code and automated tests in the relevant repository, linked to a PR. Do not treat documentation alone as completion.
