import { useState, type ChangeEvent, type FormEvent } from 'react'
import { ContactError, sendContactMessage, type FieldErrors } from '../api'
import type { ContactForm } from '../types'
import { Section } from './Section'

const emptyForm: ContactForm = { name: '', email: '', message: '', website: '' }

type Status = { state: 'idle' } | { state: 'sending' } | { state: 'sent'; message: string } | { state: 'failed'; message: string }

const inputClass =
  'mt-2 w-full rounded-lg border border-line bg-ink px-4 py-3 text-white placeholder:text-muted/60 focus:border-accent focus:outline-none'

export function Contact({ email }: { email: string }) {
  const [form, setForm] = useState<ContactForm>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ state: 'idle' })

  const update = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [event.target.name]: event.target.value })

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setStatus({ state: 'sending' })
    try {
      const message = await sendContactMessage(form)
      setStatus({ state: 'sent', message })
      setForm(emptyForm)
    } catch (error) {
      const failure = error instanceof ContactError ? error : new ContactError('Something went wrong. Please try again.')
      setErrors(failure.fieldErrors)
      setStatus({ state: 'failed', message: failure.message })
    }
  }

  const fieldError = (field: keyof ContactForm) =>
    errors[field] && (
      <p id={`${field}-error`} className="mt-1 text-sm text-rose-400">
        {errors[field]}
      </p>
    )

  return (
    <Section id="contact" index="05" title="Get in touch">
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
        <div className="reveal text-lg text-slate-300">
          <p>
            Whether it's an opportunity, a project or a question about my work, I'd be glad to hear from you. Send a
            message using the form, or email me directly:
          </p>
          <a href={`mailto:${email}`} className="link-draw mt-4 inline-block pb-0.5 font-semibold break-all text-accent transition-colors hover:text-accent-soft">
            {email}
          </a>
        </div>

        <form onSubmit={submit} noValidate className="reveal spotlight space-y-5 rounded-2xl border border-line bg-panel/60 p-6">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-slate-300">
              Name
            </label>
            <input id="name" name="name" required maxLength={100} autoComplete="name" value={form.name} onChange={update}
              aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} className={inputClass} />
            {fieldError('name')}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-300">
              Email
            </label>
            <input id="email" name="email" type="email" required maxLength={254} autoComplete="email" value={form.email}
              onChange={update} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
              className={inputClass} />
            {fieldError('email')}
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea id="message" name="message" required maxLength={5000} rows={6} value={form.message} onChange={update}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
              className={inputClass} />
            {fieldError('message')}
          </div>

          {/* Honeypot: hidden from people and screen readers, but bots fill it in */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
          </div>

          <button type="submit" disabled={status.state === 'sending'}
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-ink transition hover:bg-accent-soft disabled:cursor-wait disabled:opacity-60">
            {status.state === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          <div role="status" aria-live="polite" className="text-sm">
            {status.state === 'sending' && (
              <p className="text-muted">Sending your message. This can take a few moments.</p>
            )}
            {status.state === 'sent' && <p className="text-emerald-400">{status.message}</p>}
            {status.state === 'failed' && <p className="text-rose-400">{status.message}</p>}
          </div>
        </form>
      </div>
    </Section>
  )
}
