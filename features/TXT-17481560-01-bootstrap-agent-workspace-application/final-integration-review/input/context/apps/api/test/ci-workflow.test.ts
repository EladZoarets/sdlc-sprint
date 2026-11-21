import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterEach, describe, expect, it } from 'vitest'

const apiDir = join(dirname(fileURLToPath(import.meta.url)), '..')
const repoRoot = join(apiDir, '..', '..')
const workflow = readFileSync(join(repoRoot, '.github', 'workflows', 'ci.yml'), 'utf8')

function workflowSteps() {
  return [...workflow.matchAll(/^\s*-?\s*(?:uses|run):\s*(.+)$/gm)].map((match) => match[1].trim())
}

function guardCommand() {
  const guard = workflowSteps().find((step) => step.startsWith('if git ls-files'))
  if (guard === undefined) throw new Error('AC4 guard step not found in ci.yml')
  return guard
}

const fixtures: string[] = []

function repoTracking(paths: string[]) {
  const dir = mkdtempSync(join(tmpdir(), 'ci-guard-'))
  fixtures.push(dir)
  execFileSync('git', ['init', '-q'], { cwd: dir })
  for (const path of paths) {
    mkdirSync(dirname(join(dir, path)), { recursive: true })
    writeFileSync(join(dir, path), '')
  }
  execFileSync('git', ['add', '--', ...paths], { cwd: dir })
  return dir
}

function runGuard(cwd: string) {
  return spawnSync('bash', ['-c', guardCommand()], { cwd, encoding: 'utf8' })
}

afterEach(() => {
  for (const dir of fixtures.splice(0)) rmSync(dir, { recursive: true, force: true })
})

describe('CI workflow', () => {
  it('test_ci_workflow_runs_lint_typecheck_build_test_in_order', () => {
    expect(workflow).toMatch(/^on:\n {2}push:\n {4}branches: \[main\]\n {2}pull_request:/m)
    expect(workflowSteps().slice(0, 7)).toEqual([
      'actions/checkout@v4',
      'actions/setup-node@v4',
      'npm ci',
      'npm run lint',
      'npm run typecheck',
      'npm run build',
      'npm test',
    ])
    expect(workflowSteps().at(-1)).toBe(guardCommand())
  })

  it('test_ci_uses_node_version_file_and_npm_cache', () => {
    expect(workflow).toMatch(/node-version-file: \.nvmrc/)
    expect(workflow).toMatch(/cache: npm/)
    expect(readFileSync(join(repoRoot, '.nvmrc'), 'utf8').trim()).toBe('24')
  })

  it('test_ci_guard_passes_when_no_sdlc_paths_tracked', () => {
    const result = runGuard(repoTracking(['apps/api/src/app.ts', 'README.md']))
    expect(result.status).toBe(0)
    expect(result.stdout).toBe('')
  })

  it('test_ci_guard_fails_when_sdlc_path_tracked', () => {
    for (const marker of ['dev-sdlc', '.claude-plugin', '.sdlc-runtime', '.sdlc']) {
      const result = runGuard(repoTracking([`${marker}/plugin.json`]))
      expect(result.status, marker).toBe(1)
      expect(result.stdout).toContain('SDLC plugin files must not be committed')
    }
  })

  it('test_ci_guard_ignores_lookalike_paths', () => {
    const lookalikes = repoTracking(['docs/my-dev-sdlc-notes.md', 'dev-sdlc-notes/readme.md', 'src/.sdlc.json'])
    expect(runGuard(lookalikes).status).toBe(0)
    expect(runGuard(repoTracking(['sub/dev-sdlc/x'])).status).toBe(1)
  })
})
