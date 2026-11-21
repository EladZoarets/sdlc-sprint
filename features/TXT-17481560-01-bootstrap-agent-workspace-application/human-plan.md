---
feature_id: TXT-17481560
generated_at: 2026-11-21T09:31:42.403042+00:00
source: plan.md
generator: human_plan
schema_version: 1
---

# Human Plan — TXT-17481560

## What Changes

- The workspace becomes a single project that installs once from the top level and covers both the web app and a new small backend service.
- The new backend answers one question: "are you alive?", and replies "ok".
- The web app's header shows a live "API online" or "API offline" indicator, and the page is explicitly marked English, left-to-right.
- Every push and pull request now automatically checks code style, types, the build and a quick smoke test, and also fails if any SDLC tooling files get committed into the product.
- The README explains how to start everything locally.

## Why

The web app exists today but has nothing behind it and no safety net. This ticket makes the product genuinely runnable end to end, proves the two halves can talk to each other, and makes automatic checks the default so later work starts on solid ground.

## How

The existing web app is kept as is. A small backend service sits next to it, and the web app asks it for its health through a same-origin path that the dev server forwards, so no extra cross-site configuration is needed. The smoke tests start the backend for real and render the web shell with a pretend response, so no browser is required in CI. Developers start each half with its own short command. Choices made without asking because the run is automatic: npm for managing the packages, a lightweight Node framework for the backend, and unit-style tests rather than a browser test.

```text
 ┌───────────────┐   asks "health?"   ┌───────────────┐   forwards   ┌───────────────┐
 │   Web shell   │ ─────────────────▶ │  Dev server   │ ───────────▶ │ Backend service│
 │ (header badge)│ ◀───────────────── │   (proxy)     │ ◀─────────── │  "ok" reply    │
 └───────────────┘   online/offline   └───────────────┘              └───────────────┘
          ▲                                                                  ▲
          └──────────── automatic checks on every push (CI) ────────────────┘
```

## What Could Go Wrong

- The web tooling versions are very new, so the test libraries may not support them yet; the first install in CI will show this.
- Moving to one shared lockfile could quietly upgrade some web packages; the plan compares versions before and after.
- A request that hangs would leave the badge on "Checking" until the browser gives up.
- The guard that blocks SDLC files relies on a fixed list of folder names that may miss some.
- Hosting the backend in production is not covered here.

## Decisions Required

1. Is npm with workspaces acceptable, or is pnpm preferred?
2. Is the lightweight Node framework acceptable for the backend, or is another runtime preferred?
3. Should a browser-based end-to-end check be added later?
4. Should the data-fetching library mentioned in the README be added now or with the first real data endpoint?
5. Are there other SDLC folder names the guard should block?
