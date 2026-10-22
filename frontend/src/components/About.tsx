import { RESUME_URL } from '../site'
import type { Education, Profile } from '../types'
import { Section } from './Section'

export function About({ profile, education }: { profile: Profile; education: Education[] }) {
  return (
    <Section id="about" index="01" title="About me">
      <div className="grid gap-12 md:grid-cols-[1fr_auto]">
        <div className="space-y-5 text-lg leading-relaxed text-slate-300">
          {profile.about.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="reveal">
              {paragraph}
            </p>
          ))}

          <a
            href={RESUME_URL}
            target="_blank"
            rel="noreferrer"
            className="reveal group inline-flex items-center gap-1.5 text-base font-semibold text-accent transition-colors hover:text-accent-soft"
          >
            <span className="link-draw pb-0.5">View my resume</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>

          <div className="space-y-4 pt-4">
            {education.map((degree) => (
              <div
                key={degree.institution}
                className="reveal spotlight rounded-xl border border-line bg-panel p-5 text-base transition hover:border-accent/50"
              >
                <p className="font-mono text-sm text-accent">
                  {degree.startYear} – {degree.endYear}
                </p>
                <p className="mt-1 font-semibold text-white">{degree.institution}</p>
                <p className="text-muted">
                  {degree.degree}
                  {degree.minor && `; Minor in ${degree.minor}`}
                  {degree.cgpa && ` · CGPA ${degree.cgpa}`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {profile.avatarUrl && (
          // Gradient frame with a soft glow; tilts slightly on hover
          <div className="reveal group relative mx-auto h-fit w-fit md:mx-0">
            <div
              aria-hidden="true"
              className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent via-accent-soft/40 to-transparent opacity-60 blur-md transition group-hover:opacity-100"
            />
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              width={240}
              height={240}
              loading="lazy"
              className="relative h-60 w-60 rounded-2xl border border-accent/40 object-cover transition duration-500 group-hover:-rotate-2 group-hover:scale-[1.03]"
            />
          </div>
        )}
      </div>
    </Section>
  )
}
