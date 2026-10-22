import { formatPeriod } from '../format'
import type { Experience } from '../types'
import { Section } from './Section'

export function ExperienceSection({ experience, achievements }: { experience: Experience[]; achievements: string[] }) {
  return (
    <Section id="experience" index="02" title="Experience">
      <ol className="space-y-8 border-l border-line pl-6">
        {experience.map((job) => (
          <li key={`${job.company}-${job.start}`} className="reveal relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[1.95rem] h-3 w-3 rounded-full border-2 border-accent bg-ink shadow-[0_0_12px_2px] shadow-accent/60"
            />
            <p className="font-mono text-sm text-accent">{formatPeriod(job.start, job.end)}</p>
            <h3 className="mt-1 text-xl font-semibold text-white">
              {job.title} <span className="text-accent-soft">@ {job.company}</span>
            </h3>
            <p className="text-sm text-muted">{job.location}</p>
            <ul className="mt-4 space-y-2 text-slate-300">
              {job.highlights.map((highlight) => (
                <li key={highlight} className="group flex gap-3">
                  <span aria-hidden="true" className="mt-0.5 text-accent transition-transform duration-300 group-hover:translate-x-1">
                    ▹
                  </span>
                  <span className="transition-colors duration-300 group-hover:text-white">{highlight}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h3 className="reveal mt-14 text-xl font-semibold text-white">Achievements &amp; certifications</h3>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <li
            key={achievement}
            className="reveal spotlight rounded-xl border border-line bg-panel p-5 text-slate-300 transition hover:-translate-y-1 hover:border-accent/50"
          >
            {achievement}
          </li>
        ))}
      </ul>
    </Section>
  )
}
