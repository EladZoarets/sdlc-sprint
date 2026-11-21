import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { StrictMode } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'
import indexHtml from '../index.html?raw'
import webPackage from '../package.json'
import viteConfigSource from '../vite.config.ts?raw'
import apiPackage from '../../api/package.json'
import App from '@/App'
import { ApiStatus } from '@/components/api-status'

function mockFetch(impl: (...args: Parameters<typeof fetch>) => Promise<Response>) {
  const spy = vi.fn(impl)
  vi.stubGlobal('fetch', spy)
  return spy
}

const okResponse = () => new Response(JSON.stringify({ status: 'ok' }))

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

describe('shell', () => {
  it('test_shell_renders_brand_and_agents_heading', async () => {
    mockFetch(async () => okResponse())
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    )
    expect(screen.getAllByText('Agent Workspace').length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: /agents/i })).toBeTruthy()
    await screen.findByText('API online')
  })
})

describe('ApiStatus', () => {
  it('test_api_status_shows_checking_before_response', async () => {
    mockFetch(() => new Promise(() => {}))
    render(<ApiStatus />)
    expect(screen.getByText('Checking API')).toBeTruthy()
  })

  it('test_api_status_shows_online_when_health_ok', async () => {
    mockFetch(async () => okResponse())
    render(<ApiStatus />)
    expect(await screen.findByText('API online')).toBeTruthy()
  })

  it('test_api_status_shows_offline_when_fetch_rejects', async () => {
    mockFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    render(<ApiStatus />)
    expect(await screen.findByText('API offline')).toBeTruthy()
  })

  it('test_api_status_shows_offline_on_non_2xx_or_bad_body', async () => {
    mockFetch(async () => new Response('{}', { status: 500 }))
    const first = render(<ApiStatus />)
    expect(await screen.findByText('API offline')).toBeTruthy()
    first.unmount()

    mockFetch(async () => new Response(JSON.stringify({ status: 'nope' })))
    render(<ApiStatus />)
    expect(await screen.findByText('API offline')).toBeTruthy()
  })

  it('test_api_status_ignores_result_after_unmount', async () => {
    let resolve!: (r: Response) => void
    mockFetch(() => new Promise<Response>((r) => (resolve = r)))
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { unmount } = render(<ApiStatus />)
    unmount()
    resolve(okResponse())
    await new Promise((r) => setTimeout(r, 0))
    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })

  it('test_api_status_stable_under_strict_mode_double_mount', async () => {
    const spy = mockFetch(async (_input, init) => {
      if (init?.signal?.aborted) throw new DOMException('aborted', 'AbortError')
      return okResponse()
    })
    render(
      <StrictMode>
        <ApiStatus />
      </StrictMode>,
    )
    expect(await screen.findByText('API online')).toBeTruthy()
    expect(screen.queryByText('API offline')).toBeNull()
    expect(spy.mock.calls.length).toBeGreaterThanOrEqual(1)
  })

  it('test_api_status_stays_checking_while_request_hangs', async () => {
    mockFetch(() => new Promise(() => {}))
    render(<ApiStatus />)
    await new Promise((r) => setTimeout(r, 20))
    await waitFor(() => expect(screen.getByText('Checking API')).toBeTruthy())
  })
})

describe('web tooling config', () => {
  it('test_index_html_declares_lang_en_and_dir_ltr', () => {
    expect(indexHtml).toMatch(/<html[^>]*\slang="en"/)
    expect(indexHtml).toMatch(/<html[^>]*\sdir="ltr"/)
  })

  it('test_vite_dev_proxy_forwards_api_prefix_stripped', () => {
    expect(viteConfigSource).toMatch(/'\/api'\s*:/)
    expect(viteConfigSource).toContain('API_PROXY_TARGET')
    expect(viteConfigSource).toMatch(/rewrite:[^\n]*replace\(\/\^\\\/api\/, ''\)/)
  })

  it('test_web_and_api_packages_expose_typecheck_and_test_scripts', () => {
    for (const pkg of [webPackage, apiPackage]) {
      expect(pkg.scripts.typecheck).toBeTruthy()
      expect(pkg.scripts.test).toBeTruthy()
    }
  })
})
