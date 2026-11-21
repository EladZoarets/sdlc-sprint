<!-- review-start -->

# Final integration review — TXT-17481560

Status: passed

## Findings

### FIR-01 — Documented `API_PROXY_TARGET` override in `apps/web/.env` is never read by the Vite proxy
ID: FIR-01
Severity: non-blocking
Tasks involved: T-02, T-03
Files involved: `agent-workspace/apps/web/vite.config.ts`, `agent-workspace/apps/web/.env.example`, `agent-workspace/README.md`

Scenario:
A developer follows the README (T-03): "The proxy target defaults to `http://127.0.0.1:3001` and can be overridden with `API_PROXY_TARGET`... See `apps/web/.env.example` for the same values." They copy `apps/web/.env.example` to `apps/web/.env`, set `API_PROXY_TARGET=http://127.0.0.1:4000`, and start the API with `PORT=4000 npm run dev:api` and the web app with `npm run dev:web`.

Expected behavior:
The `/api` dev proxy forwards to `http://127.0.0.1:4000`, so the header `ApiStatus` shows "API online".

Actual behavior:
`vite.config.ts` reads `process.env.API_PROXY_TARGET`. Vite loads `.env` files only into `import.meta.env` for client code (and only `VITE_`-prefixed keys); it does not populate `process.env` while evaluating the config. The value in `.env` is ignored, the proxy still targets port 3001, and `ApiStatus` shows "API offline". The override only works when exported in the shell environment. The default path (3001 on both sides) works, so AC2 is met in the default setup.

Evidence:
`agent-workspace/apps/web/vite.config.ts:16` — `target: process.env.API_PROXY_TARGET ?? 'http://127.0.0.1:3001'` (no `loadEnv`).
`agent-workspace/apps/web/.env.example:4` — `API_PROXY_TARGET=http://127.0.0.1:3001` is listed next to `VITE_API_BASE_URL` as a file-configurable value.
`agent-workspace/README.md` (Local development / Web environment sections) — says the target can be overridden and points to `.env.example`.

Required fix:
Use the callback form of `defineConfig(({ mode }) => { const env = loadEnv(mode, process.cwd(), ''); ... target: env.API_PROXY_TARGET || 'http://127.0.0.1:3001' })`. The other option is to state in `.env.example` and the README that `API_PROXY_TARGET` must be a shell environment variable. The existing source-regex test `test_vite_dev_proxy_forwards_api_prefix_stripped` still passes with either change.

<!-- review-end -->

Final integration review: status=passed; 0 blocking; 1 non-blocking.

## Escape hatches

```json
[
  {
    "status": "needs_targeted_investigation",
    "investigations": [
      {
        "id": "IR-Q01",
        "question": "Does `npm run typecheck` (tsc -b) and therefore `npm run build` in apps/web succeed with TypeScript 7.0.2, given that src/app.test.tsx imports `../package.json` and `../../api/package.json` and tsconfig.app.json (include: [\"src\"]) does not set `resolveJsonModule`?",
        "files": ["agent-workspace/apps/web/tsconfig.app.json", "agent-workspace/apps/web/tsconfig.json", "agent-workspace/apps/web/src/app.test.tsx"],
        "symbols": ["resolveJsonModule", "webPackage", "apiPackage"],
        "reason": "CI (T-03) runs lint, typecheck and build across T-01/T-02 code to satisfy AC3. The validation evidence records only vitest runs, which do not type-check, so no recorded evidence shows that tsc -b passes on the combined workspace. Whether TS 7 enables JSON module resolution by default under moduleResolution=bundler cannot be determined from the bundle without running the compiler."
      }
    ]
  }
]
```

## Out-of-bundle reads
- `agent-workspace/apps/web/tsconfig.app.json` — checked whether the web typecheck config resolves the JSON imports in the T-02 test file that CI (T-03) type-checks.
- `agent-workspace/node_modules/typescript/package.json` — confirmed which TypeScript major runs `tsc -b`.
