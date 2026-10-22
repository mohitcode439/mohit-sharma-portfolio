import type { Link, Profile } from '../types'
import { HeroScene } from './HeroScene'
import { Typewriter } from './Typewriter'

const roles = ['Java microservices.', 'Spring Boot APIs.', 'clean React frontends.', 'reliable software.']

export function Hero({ profile, links }: { profile: Profile; links: Link[] }) {
  return (
    <section id="top" className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden">
      {/* Nebula glow + 3D planets behind the text */}
      <div
        aria-hidden="true"
        className="absolute -top-40 left-1/3 -z-10 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">
        <h1 className="animate-rise bg-gradient-to-r from-white via-white to-accent-soft bg-clip-text text-5xl font-extrabold tracking-tight text-transparent [animation-delay:80ms] sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-4 animate-rise text-2xl font-semibold text-slate-300 [animation-delay:160ms] sm:text-3xl">
          I build <Typewriter phrases={roles} />
        </p>
        <p className="mt-6 max-w-xl animate-rise text-lg text-muted [animation-delay:240ms]">
          {profile.tagline} Currently {profile.currentRole}.
        </p>

        <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:320ms]">
          <a
            href="#projects"
            className="rounded-lg bg-accent px-6 py-3 font-semibold text-ink shadow-[0_0_30px_-6px] shadow-accent transition hover:-translate-y-0.5 hover:bg-accent-soft"
          >
            View my work
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-line bg-ink/40 px-6 py-3 font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-accent"
          >
            Get in touch
          </a>
        </div>

        <ul className="mt-10 flex animate-rise flex-wrap gap-x-6 gap-y-2 text-sm [animation-delay:400ms]">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-muted underline-offset-4 transition hover:text-white hover:underline"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
