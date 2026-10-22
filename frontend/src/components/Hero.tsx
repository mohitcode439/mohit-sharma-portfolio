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
        {/* The gradient is twice as wide as the text; hovering slides it so the violet flows across */}
        <h1 className="w-fit animate-rise bg-[linear-gradient(90deg,white_0%,white_30%,var(--color-accent-soft)_50%,white_70%,white_100%)] bg-[length:200%_100%] bg-left bg-clip-text text-5xl font-extrabold tracking-tight text-transparent transition-[background-position] duration-1000 ease-out [animation-delay:80ms] hover:bg-right sm:text-7xl">
          {profile.name}
        </h1>
        {/* Two lines reserved on phones so longer phrases don't push the buttons while typing */}
        <p className="mt-4 min-h-[2.6em] animate-rise text-2xl font-semibold text-slate-300 [animation-delay:160ms] sm:min-h-0 sm:text-3xl">
          I build <Typewriter phrases={roles} />
        </p>
        <p className="mt-6 max-w-xl animate-rise text-lg text-muted [animation-delay:240ms]">
          {profile.tagline} Currently {profile.currentRole}.
        </p>

        <div className="mt-10 flex animate-rise flex-wrap gap-4 [animation-delay:320ms]">
          <a
            href="#projects"
            className="btn-shine group inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 font-semibold text-ink shadow-[0_0_30px_-6px] shadow-accent transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_-4px]"
          >
            View my work
            <span aria-hidden="true" className="-mr-1 w-0 overflow-hidden transition-all duration-300 group-hover:w-4">
              →
            </span>
          </a>
          <a
            href="#contact"
            className="btn-fill rounded-lg border border-line bg-ink/40 px-6 py-3 font-semibold text-white backdrop-blur hover:-translate-y-0.5 hover:border-accent hover:text-ink"
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
                className="link-draw group pb-0.5 text-muted transition-colors hover:text-white"
              >
                {link.label}{' '}
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
