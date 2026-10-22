import { useEffect, useState } from 'react'
import { useActiveSection } from '../effects'

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
// The hero ("top") is tracked too, so nothing is highlighted while it is on screen
const sectionIds = ['top', ...navItems.map((item) => item.id)]

export function Header({ name }: { name: string }) {
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the phone menu with Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const linkClass = (id: string) =>
    `relative whitespace-nowrap transition-colors hover:text-white ${active === id ? 'text-white' : 'text-muted'}`

  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-ink/70 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex max-w-5xl items-center gap-6 px-5 py-4 sm:px-8">
        <a href="#top" className="group shrink-0 font-semibold tracking-tight text-white">
          {name}
          <span aria-hidden="true" className="text-accent transition group-hover:text-accent-soft">
            .
          </span>
        </a>

        {/* Laptops and tablets: links in a row */}
        <ul className="ml-auto hidden gap-5 text-sm sm:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} aria-current={active === item.id ? 'location' : undefined} className={`group ${linkClass(item.id)}`}>
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded bg-accent transition-all duration-300 ${
                    active === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Phones: menu button */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-lg border border-line sm:hidden"
        >
          <span aria-hidden="true" className={`h-0.5 w-4 rounded bg-white transition ${menuOpen ? 'translate-y-1 rotate-45' : ''}`} />
          <span aria-hidden="true" className={`h-0.5 w-4 rounded bg-white transition ${menuOpen ? '-translate-y-1 -rotate-45' : ''}`} />
        </button>
      </nav>

      {menuOpen && (
        <ul id="mobile-menu" className="border-t border-line/60 px-5 pb-4 sm:hidden">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-base ${linkClass(item.id)}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div aria-hidden="true" className="scroll-progress h-0.5 bg-gradient-to-r from-accent to-accent-soft" />
    </header>
  )
}
