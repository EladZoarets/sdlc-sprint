---
id: TXT-68956674
title: 'Feature: Support Linear as an Issue Tracker alongside Jira'
status: ready
owner: null
created: '2026-11-20'
service_repos:
- https://github.com/EladZoarets/agent-workspace
parent_jira_id: null
source_type: text
source_kind: spec
source_file: source.md
source_sha256: 873d8802db40e8426886da72381b14f59c19960b57743ce1cc8a7f4f259fe707
jira_sync_enabled: false
acceptance_criteria: []
---

# Feature: Support Linear as an Issue Tracker alongside Jira

## Description

# Feature: Support Linear as an Issue Tracker alongside Jira

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
