import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Contact } from './Contact'

const jsonResponse = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

async function fillAndSend() {
  const user = userEvent.setup()
  await user.type(screen.getByLabelText('Name'), 'Asha')
  await user.type(screen.getByLabelText('Email'), 'asha@example.com')
  await user.type(screen.getByLabelText('Message'), 'Hello!')
  await user.click(screen.getByRole('button', { name: 'Send message' }))
}

describe('Contact', () => {
  it('sends the message and confirms success', async () => {
    const fetchMock = vi.fn(() => Promise.resolve(jsonResponse({ message: 'Thanks for reaching out!' }, 202)))
    vi.stubGlobal('fetch', fetchMock)
    render(<Contact email="me@example.com" />)

    await fillAndSend()

    expect(await screen.findByText('Thanks for reaching out!')).toBeInTheDocument()
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit]
    expect(url).toMatch(/\/api\/v1\/contact$/)
    expect(JSON.parse(init.body as string)).toEqual({
      name: 'Asha',
      email: 'asha@example.com',
      message: 'Hello!',
      website: '',
    })
    expect(screen.getByLabelText('Name')).toHaveValue('')
  })

  it('shows the field errors returned by the API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve(
          jsonResponse({ detail: 'Some fields are invalid', errors: { email: 'must be a well-formed email address' } }, 400),
        ),
      ),
    )
    render(<Contact email="me@example.com" />)

    await fillAndSend()

    expect(await screen.findByText('must be a well-formed email address')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Some fields are invalid')).toBeInTheDocument()
  })

  it('explains when the server cannot be reached', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))))
    render(<Contact email="me@example.com" />)

    await fillAndSend()

    expect(await screen.findByText(/Couldn't reach the server/)).toBeInTheDocument()
  })
})
