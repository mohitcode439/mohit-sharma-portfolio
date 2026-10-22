import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import App from './App'
import snapshot from './data/snapshot.json'

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

describe('App', () => {
  it('shows the bundled content immediately, before the API answers', () => {
    vi.stubGlobal('fetch', vi.fn(() => new Promise(() => {})))

    render(<App />)

    expect(screen.getByRole('heading', { level: 1, name: snapshot.profile.name })).toBeInTheDocument()
    expect(screen.getByText('Oct 2025 – Present')).toBeInTheDocument()
  })

  it('switches to live data once the API responds', async () => {
    const live = { ...snapshot, profile: { ...snapshot.profile, tagline: 'Fresh from the API.' } }
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve(jsonResponse(live))))

    render(<App />)

    expect(await screen.findByText(/Fresh from the API\./)).toBeInTheDocument()
  })

  it('keeps the bundled content when the API is unreachable', async () => {
    const fetchMock = vi.fn(() => Promise.reject(new TypeError('Failed to fetch')))
    vi.stubGlobal('fetch', fetchMock)

    render(<App />)

    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalled())
    expect(screen.getByRole('heading', { level: 1, name: snapshot.profile.name })).toBeInTheDocument()
    expect(screen.getByText(snapshot.profile.tagline, { exact: false })).toBeInTheDocument()
  })
})
