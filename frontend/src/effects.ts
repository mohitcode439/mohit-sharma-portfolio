import { useEffect, useState } from 'react'

/**
 * Adds `is-visible` to every `.reveal` element the first time it scrolls into view.
 * Pass the rendered data as `dependency` so elements re-created by new content are picked up too.
 */
export function useReveal(dependency?: unknown): void {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)'))
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('is-visible'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [dependency])
}

/** Lets `.spotlight` cards glow where the pointer is (one listener for the whole page). */
export function useSpotlight(): void {
  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>('.spotlight')
      if (!card) return
      const rect = card.getBoundingClientRect()
      card.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      card.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }
    document.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => document.removeEventListener('pointermove', onPointerMove)
  }, [])
}

/** The id of the section currently in the middle of the viewport, for highlighting the menu. */
export function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      // A thin band across the middle of the screen
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [ids])

  return active
}
