import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiBaseUrl, fetchHealth } from '@/lib/api'

function mockFetch(impl: (...args: Parameters<typeof fetch>) => Promise<Response>) {
  const spy = vi.fn(impl)
  vi.stubGlobal('fetch', spy)
  return spy
}

const json = (body: unknown, init?: ResponseInit) => new Response(JSON.stringify(body), init)

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('fetchHealth', () => {
  it('test_fetch_health_resolves_on_ok_body', async () => {
    mockFetch(async () => json({ status: 'ok' }))
    await expect(fetchHealth()).resolves.toEqual({ status: 'ok' })
  })

  it('test_fetch_health_calls_api_health_by_default', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '')
    const spy = mockFetch(async () => json({ status: 'ok' }))
    await fetchHealth()
    expect(spy.mock.calls[0][0]).toBe('/api/health')
  })

  it('test_api_base_url_strips_trailing_slash', async () => {
    vi.stubEnv('VITE_API_BASE_URL', 'http://example.test:3001//')
    expect(apiBaseUrl()).toBe('http://example.test:3001')
    const spy = mockFetch(async () => json({ status: 'ok' }))
    await fetchHealth()
    expect(spy.mock.calls[0][0]).toBe('http://example.test:3001/health')
  })

  it('test_fetch_health_rejects_on_non_2xx', async () => {
    mockFetch(async () => json({ status: 'ok' }, { status: 503 }))
    await expect(fetchHealth()).rejects.toThrow()
  })

  it('test_fetch_health_rejects_on_wrong_status_body', async () => {
    mockFetch(async () => json({ status: 'degraded' }))
    await expect(fetchHealth()).rejects.toThrow()
  })

  it('test_fetch_health_rejects_on_invalid_json', async () => {
    mockFetch(async () => new Response('not json'))
    await expect(fetchHealth()).rejects.toThrow()
  })

  it('test_fetch_health_rejects_on_network_error', async () => {
    mockFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    await expect(fetchHealth()).rejects.toThrow('Failed to fetch')
  })

  it('test_fetch_health_rejects_when_signal_aborted', async () => {
    mockFetch(
      (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => reject(init.signal?.reason))
        }),
    )
    const controller = new AbortController()
    const pending = fetchHealth(controller.signal)
    controller.abort()
    await expect(pending).rejects.toBeDefined()
  })
})
