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

  return (
    <header className="sticky top-0 z-20 border-b border-line/60 bg-ink/70 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex max-w-5xl items-center gap-6 px-5 py-4 sm:px-8">
        <a href="#top" className="group shrink-0 font-semibold tracking-tight text-white">
          {name}
          <span aria-hidden="true" className="text-accent transition group-hover:text-accent-soft">
            .
          </span>
        </a>
        <ul className="ml-auto flex gap-5 overflow-x-auto pb-1.5 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active === item.id ? 'location' : undefined}
                className={`relative whitespace-nowrap transition-colors hover:text-white ${
                  active === item.id ? 'text-white' : 'text-muted'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-0.5 rounded bg-accent transition-all duration-300 ${
                    active === item.id ? 'w-full' : 'w-0'
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div aria-hidden="true" className="scroll-progress h-0.5 bg-gradient-to-r from-accent to-accent-soft" />
    </header>
  )
}
