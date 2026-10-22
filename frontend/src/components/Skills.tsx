import type { SkillGroup } from '../types'
import { Section } from './Section'
import { SkillCube, type CubeTheme } from './SkillCube'

// Colour sets for the cubes (full class strings so Tailwind keeps them)
const cubeThemes = {
  violet: {
    face: 'border-violet-400/60 from-violet-500/40 via-panel/90 to-ink/90 shadow-[inset_0_0_30px_rgb(139_92_246/0.35)]',
    label: 'text-violet-300',
    shadow: 'bg-violet-500/30',
  },
  cyan: {
    face: 'border-cyan-400/60 from-cyan-500/35 via-panel/90 to-ink/90 shadow-[inset_0_0_30px_rgb(34_211_238/0.3)]',
    label: 'text-cyan-300',
    shadow: 'bg-cyan-400/30',
  },
  amber: {
    face: 'border-amber-400/60 from-amber-500/35 via-panel/90 to-ink/90 shadow-[inset_0_0_30px_rgb(251_191_36/0.3)]',
    label: 'text-amber-300',
    shadow: 'bg-amber-400/30',
  },
} satisfies Record<string, CubeTheme>

const cubes = [
  {
    title: 'Backend',
    faces: ['Java', 'Spring Boot', 'Microservices', 'REST APIs', 'PostgreSQL', 'Spring AI'],
    theme: cubeThemes.violet,
    seconds: 8,
  },
  {
    title: 'Frontend',
    faces: ['React', 'TypeScript', 'JavaScript', 'Redux', 'Tailwind CSS', 'Three.js'],
    theme: cubeThemes.cyan,
    seconds: 10,
    reverse: true,
  },
  {
    title: 'Testing & Tools',
    faces: ['JUnit', 'Mockito', 'Playwright', 'Cucumber', 'Git', 'Maven'],
    theme: cubeThemes.amber,
    seconds: 7,
  },
]

// One accent colour per skill card (full class strings so Tailwind keeps them)
const cardAccents = [
  { heading: 'text-sky-300', bar: 'bg-sky-400', chip: 'hover:border-sky-400 hover:bg-sky-400/15 hover:shadow-sky-400/30' },
  { heading: 'text-violet-300', bar: 'bg-violet-400', chip: 'hover:border-violet-400 hover:bg-violet-400/15 hover:shadow-violet-400/30' },
  { heading: 'text-cyan-300', bar: 'bg-cyan-400', chip: 'hover:border-cyan-400 hover:bg-cyan-400/15 hover:shadow-cyan-400/30' },
  { heading: 'text-amber-300', bar: 'bg-amber-400', chip: 'hover:border-amber-400 hover:bg-amber-400/15 hover:shadow-amber-400/30' },
  { heading: 'text-emerald-300', bar: 'bg-emerald-400', chip: 'hover:border-emerald-400 hover:bg-emerald-400/15 hover:shadow-emerald-400/30' },
  { heading: 'text-rose-300', bar: 'bg-rose-400', chip: 'hover:border-rose-400 hover:bg-rose-400/15 hover:shadow-rose-400/30' },
]

export function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <Section id="skills" index="03" title="Skills">
      <div className="reveal grid grid-cols-3 gap-2 sm:gap-8">
        {cubes.map((cube) => (
          <SkillCube key={cube.title} {...cube} />
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => {
          const accent = cardAccents[index % cardAccents.length]
          return (
            <div
              key={group.category}
              className="reveal spotlight relative overflow-hidden rounded-xl border border-line bg-panel p-5 transition hover:-translate-y-1 hover:border-white/20"
            >
              <span aria-hidden="true" className={`absolute inset-x-0 top-0 h-0.5 ${accent.bar}`} />
              <h3 className={`font-mono text-sm tracking-wide uppercase ${accent.heading}`}>{group.category}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className={`cursor-default rounded-full border border-line px-3 py-1 text-sm text-slate-200 transition duration-200 hover:-translate-y-0.5 hover:text-white hover:shadow-[0_6px_18px_-6px] ${accent.chip}`}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
