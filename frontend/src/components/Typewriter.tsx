import { useEffect, useState } from 'react'

const TYPE_MS = 70
const DELETE_MS = 35
const HOLD_MS = 1600

/** Types and deletes each phrase in turn. Reduced-motion users just see the first phrase. */
export function Typewriter({ phrases }: { phrases: string[] }) {
  const [index, setIndex] = useState(0)
  const [length, setLength] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [animate] = useState(() => !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    if (!animate) return
    const phrase = phrases[index]
    let delay = deleting ? DELETE_MS : TYPE_MS
    if (!deleting && length === phrase.length) delay = HOLD_MS

    const timer = setTimeout(() => {
      if (!deleting && length === phrase.length) setDeleting(true)
      else if (deleting && length === 0) {
        setDeleting(false)
        setIndex((index + 1) % phrases.length)
      } else setLength(length + (deleting ? -1 : 1))
    }, delay)
    return () => clearTimeout(timer)
  }, [animate, deleting, index, length, phrases])

  const text = animate ? phrases[index].slice(0, length) : phrases[0]

  return (
    <>
      <span className="sr-only">{phrases.join(', ')}</span>
      <span aria-hidden="true">
        {text}
        <span className="ml-0.5 inline-block w-[0.6ch] animate-pulse text-accent">|</span>
      </span>
    </>
  )
}
