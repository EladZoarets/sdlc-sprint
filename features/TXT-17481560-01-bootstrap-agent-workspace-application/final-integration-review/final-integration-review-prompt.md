You are the integration-reviewer agent for feature TXT-17481560.

FEATURE_FOLDER:    /Users/eladzoarets/.cache/sdlc/sprint-worktrees/sdlc-sprint-TXT-17481560-01-bootstrap-agent-workspace-application-051da96b/worktree/features/TXT-17481560-01-bootstrap-agent-workspace-application
SERVICE_REPO_ROOT: /Users/eladzoarets/.cache/sdlc/sprint-worktrees/sdlc-sprint-TXT-17481560-01-bootstrap-agent-workspace-application-051da96b/worktree/features/TXT-17481560-01-bootstrap-agent-workspace-application/.sdlc-runtime/branching/worktrees/agent-workspace/feature/TXT-17481560-01-bootstrap-agent-workspace-application
REVIEW_MODE:       initial

REVIEWER_HINT:     Resource cleanup/disposal semantics changed. Inspect unchanged callers and lifecycle paths for ownership, reentrancy, lock scope, retry, and cleanup assumptions. Follow specific symbols into the service repository when necessary.

Read your input bundle per your system prompt's "Paths — HARD RULE" section, and produce your result exactly per your system prompt's Output section.

---
RESPONSE_PATH: /Users/eladzoarets/.cache/sdlc/sprint-worktrees/sdlc-sprint-TXT-17481560-01-bootstrap-agent-workspace-application-051da96b/worktree/features/TXT-17481560-01-bootstrap-agent-workspace-application/final-integration-review/review.md

Write your COMPLETE result for this invocation directly to RESPONSE_PATH using the Write tool, in the exact format your system prompt's Output section specifies. Do not repeat that content in your final message — the orchestrator reads it from RESPONSE_PATH, not from your response.

Your final message to the orchestrator MUST be ONLY this JSON ACK (no more than 512 bytes, no other text):
{"status":"completed","response_path":"/Users/eladzoarets/.cache/sdlc/sprint-worktrees/sdlc-sprint-TXT-17481560-01-bootstrap-agent-workspace-application-051da96b/worktree/features/TXT-17481560-01-bootstrap-agent-workspace-application/final-integration-review/review.md"}

If you cannot write the file, return instead:
{"status":"failed","response_path":"/Users/eladzoarets/.cache/sdlc/sprint-worktrees/sdlc-sprint-TXT-17481560-01-bootstrap-agent-workspace-application-051da96b/worktree/features/TXT-17481560-01-bootstrap-agent-workspace-application/final-integration-review/review.md","error":"<short reason>"}
