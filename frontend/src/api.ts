import type { ContactForm, Portfolio } from './types'

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

// A sleeping free-tier instance can take a minute or two to start a JVM
const REQUEST_TIMEOUT_MS = 120_000

export async function fetchPortfolio(signal?: AbortSignal): Promise<Portfolio> {
  const response = await fetch(`${API_URL}/api/v1/portfolio`, {
    signal: signal ?? AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  if (!response.ok) {
    throw new Error(`Portfolio request failed: ${response.status}`)
  }
  return response.json()
}

/** Field name -> message, as returned in the API's problem details */
export type FieldErrors = Partial<Record<keyof ContactForm, string>>

export class ContactError extends Error {
  readonly fieldErrors: FieldErrors

  constructor(message: string, fieldErrors: FieldErrors = {}) {
    super(message)
    this.fieldErrors = fieldErrors
  }
}

export async function sendContactMessage(form: ContactForm): Promise<string> {
  let response: Response
  try {
    response = await fetch(`${API_URL}/api/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    })
  } catch {
    throw new ContactError("Couldn't reach the server. Please try again, or email me directly.")
  }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new ContactError(body.detail ?? 'Something went wrong. Please try again.', body.errors ?? {})
  }
  return body.message
}
