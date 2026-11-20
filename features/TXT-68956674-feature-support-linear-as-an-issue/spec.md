---
id: TXT-68956674
title: 'Feature: Support Linear as an Issue Tracker alongside Jira'
status: ready
owner: null
created: '2026-11-20'
service_repos:
- multi-agents-sdlc/dev-sdlc
parent_jira_id: null
source_type: text
source_kind: spec
source_file: source.md
source_sha256: 873d8802db40e8426886da72381b14f59c19960b57743ce1cc8a7f4f259fe707
jira_sync_enabled: false
acceptance_criteria:
- 'AC1: An Issue Tracker abstraction exists covering fetch issue and metadata, fetch
  parent and child issues, create child issues, add comments, update status, resolve
  users and teams, link issues to pull requests, and retrieve issue URLs, with both
  the Jira and Linear providers implementing it.'
- 'AC2: The existing Jira integration behavior is preserved - all pre-existing Jira
  regression tests pass unmodified.'
- 'AC3: A Linear provider implements the abstraction via the official Linear GraphQL
  API, with unit tests against mocked API responses.'
- 'AC4: Provider selection resolves correctly from an issue URL, explicit configuration,
  and issue identifier lookup; an ambiguous identifier is resolved by the explicitly
  configured default provider, and without one the command halts with an error naming
  both candidates - covered by tests.'
- 'AC5: Provider-specific statuses and approval semantics map to normalized SDLC states
  for both providers, without assuming identical workflows.'
- 'AC6: /plan, /generate-tasks, /run, and /review operate end-to-end with either provider
  selected, verified live against a real Linear workspace with a test issue in addition
  to mocked contract tests.'
- 'AC7: Contract tests shared by both providers verify identical abstraction behavior;
  provider credentials are isolated and verified by test to never appear in logs.'
- 'AC8: Missing permissions, rate limits, and API failures produce surfaced, non-crashing
  errors; interrupted synchronization recovers; retries never create duplicate child
  issues or comments - each verified by test.'
---

# Feature: Support Linear as an Issue Tracker alongside Jira

## Description

# Feature: Support Linear as an Issue Tracker alongside Jira

## Scope

In scope: Issue Tracker abstraction over the existing Jira integration; Linear provider via the official GraphQL API; provider selection via URL, explicit config, and identifier lookup with ambiguity handling; normalized status/approval mapping per provider; /plan, /generate-tasks, /run, and /review working with both providers; credential isolation. Out of scope: Linear Agent Sessions and webhooks (separate follow-up feature); rewriting the existing Jira integration.

## Goal
Extend the existing SDLC to support Linear as an additional issue tracking provider, without breaking Jira functionality.

## Requirements

1. Inspect the existing Jira integration and identify all Jira-specific dependencies across planning, task generation, execution, approvals, status updates and reporting.

2. Introduce an Issue Tracker abstraction supporting:
   - Fetch issue and metadata
   - Fetch parent and child issues
   - Create child issues
   - Add comments
   - Update status
   - Resolve users and teams
   - Link issues to pull requests
   - Retrieve issue URLs

3. Implement a Linear provider using the official GraphQL API.

4. Preserve the existing Jira provider and its behavior.

5. Support provider selection through:
   - Issue URL
   - Explicit configuration
   - Issue identifier lookup
   - Ambiguity handling

6. Map provider-specific statuses and approval semantics to normalized SDLC states without assuming identical workflows.

7. Ensure `/plan`, `/generate-tasks`, `/run`, and `/review` work with both providers.

8. Keep provider credentials isolated and never expose them in logs.

## Testing

- Existing Jira regression tests must pass.
- Add Linear provider unit tests with mocked API responses.
- Add contract tests shared by both providers.
- Test ambiguous issue identifiers.
- Test missing permissions, rate limits and API failures.
- Test recovery from interrupted synchronization.
- Verify that retries do not create duplicate child issues or comments.

## Implementation instructions

Use the existing SDLC workflow:

1. Analyze the repository and current Jira integration.
2. Produce a technical plan and identify migration risks.
3. Break the implementation into incremental tasks.
4. Implement using the existing SDLC.
5. Run all relevant tests.
6. Create a PR.

Do not rewrite the existing Jira integration unnecessarily.

Do not introduce Linear Agent Sessions or webhooks in this feature. Those belong to a separate follow-up feature.

Prefer the smallest abstraction that supports the existing functionality.
