import type { ReactNode } from 'react'

interface SectionProps {
  id: string
  /** Small monospace label above the title, e.g. "02" */
  index: string
  title: string
  children: ReactNode
}

export function Section({ id, index, title, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
      <div className="reveal group flex items-center gap-4">
        <p className="font-mono text-sm text-accent transition duration-300 group-hover:text-accent-soft group-hover:[text-shadow:0_0_12px_rgb(139_124_255)]">
          {index}
        </p>
        <h2 id={`${id}-title`} className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <span aria-hidden="true" className="h-px flex-1 bg-gradient-to-r from-line to-transparent transition-colors duration-500 group-hover:from-accent" />
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}
