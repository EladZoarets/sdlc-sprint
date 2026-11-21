# CI fix: PR #1 attempt 1 (head a44c173)

Root cause: The root `package-lock.json` was generated on macOS (darwin-arm64) and only records the optional native packages for that platform. On the ubuntu runner, `npm ci` therefore installed no linux native bindings. `oxlint` failed in both workspaces with "Cannot find native binding" and "Cannot find module '@oxlint/binding-linux-x64-gnu'" (npm bug https://github.com/npm/cli/issues/4828). The same gap affects the later CI steps: vite/rolldown (`@rolldown/binding-linux-x64-gnu`), rollup (`@rollup/rollup-linux-x64-gnu`), esbuild (`@esbuild/linux-x64`), lightningcss and tailwind oxide. The lock had 127 optional-dependency targets with no resolved entry. This is a code-level defect in the committed lockfile, not a flake.

Fix: Regenerated `package-lock.json` from the unchanged `package.json` with `npm install --package-lock-only --ignore-scripts` (npm 11.16.0), after deleting the old lock. The result resolves all optional platform packages (0 unresolved optional targets; 558 packages). Versions were kept: no range in `package.json` changed and no dependency was pinned or dropped. The only resolution differences are npm dedupe artifacts: top-level `lru-cache` moved 5.1.1 -> 10.4.3, and two nested duplicates (`@asamuzakjp/css-color/node_modules/lru-cache`, `obug`) were removed. The `@babel/helper-compilation-targets` dependency on `lru-cache ^5.1.1` still resolves to its own nested 5.1.1 copy (`node_modules/@babel/helper-compilation-targets/node_modules/lru-cache`). `package.json` is unchanged. CI configuration, tests and source were not touched. `--legacy-peer-deps` was not used.

Validation:
- Reproduced with the original lock, simulating the linux runner in a scratch copy: `npm ci --os=linux --cpu=x64 --libc=glibc --ignore-scripts` completed, but `node_modules/@oxlint`, `@rolldown`, `@rollup`, `@esbuild`, `@tailwindcss/oxide-linux-x64-gnu` and `lightningcss-linux-x64-gnu` were all absent.
- Same simulation with the regenerated lock: `npm ci --os=linux --cpu=x64 --libc=glibc --ignore-scripts` exit 0. Installed `@oxlint/binding-linux-x64-gnu`, `@rolldown/binding-linux-x64-gnu`, `@rollup/rollup-linux-x64-gnu`, `@esbuild/linux-x64`, `@tailwindcss/oxide-linux-x64-gnu` and `lightningcss-linux-x64-gnu`. A linux-binary run cannot execute on this darwin host, so the native binary execution is validated by CI, not locally.
- `npm run lint` (repo root, darwin host): exit 0. One pre-existing `react(only-export-components)` warning in `apps/web/src/components/ui/button.tsx:57`, not an error.
- `npm run typecheck`: exit 0 (`tsc -b` for web; api typecheck also ran under the workspace script).
- `npm test`: exit 0. api 16/16 passed (2 files); web 19/19 passed (2 files).
- `git diff --cached --stat`: `package-lock.json` only (3140 insertions, 286 deletions). `package.json` unchanged.

Files changed:
- `package-lock.json` (regenerated; staged with `git add -- package-lock.json`, not committed or pushed)
