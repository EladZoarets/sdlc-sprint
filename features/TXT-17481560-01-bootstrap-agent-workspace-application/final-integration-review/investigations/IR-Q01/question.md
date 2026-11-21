# Investigation IR-Q01

## Question

Does `npm run typecheck` (tsc -b) and therefore `npm run build` in apps/web succeed with TypeScript 7.0.2, given that src/app.test.tsx imports `../package.json` and `../../api/package.json` and tsconfig.app.json (include: ["src"]) does not set `resolveJsonModule`?

## Files named

- `agent-workspace/apps/web/tsconfig.app.json`
- `agent-workspace/apps/web/tsconfig.json`
- `agent-workspace/apps/web/src/app.test.tsx`

## Symbols named

- `resolveJsonModule`
- `webPackage`
- `apiPackage`

## Why the bounded bundle could not answer this

CI (T-03) runs lint, typecheck and build across T-01/T-02 code to satisfy AC3. The validation evidence records only vitest runs, which do not type-check, so no recorded evidence shows that tsc -b passes on the combined workspace. Whether TS 7 enables JSON module resolution by default under moduleResolution=bundler cannot be determined from the bundle without running the compiler.

## Named files that could not be copied into this bundle

- `agent-workspace/apps/web/tsconfig.app.json`
- `agent-workspace/apps/web/tsconfig.json`
- `agent-workspace/apps/web/src/app.test.tsx`
