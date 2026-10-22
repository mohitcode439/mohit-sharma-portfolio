import type { SkillGroup } from '../types'
import { Section } from './Section'
import { SkillCube } from './SkillCube'

export function Skills({ skills }: { skills: SkillGroup[] }) {
  return (
    <Section id="skills" index="03" title="Skills">
      <div className="reveal">
        <SkillCube />
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.category}
            className="reveal spotlight rounded-xl border border-line bg-panel p-5 transition hover:-translate-y-1 hover:border-accent/50"
          >
            <h3 className="font-mono text-sm tracking-wide text-accent uppercase">{group.category}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-line px-3 py-1 text-sm text-slate-200 transition hover:border-accent hover:bg-accent/15 hover:text-white"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
