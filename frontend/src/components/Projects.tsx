import type { Project } from '../types'
import { Section } from './Section'

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <Section id="projects" index="04" title="Projects">
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="reveal spotlight group flex flex-col overflow-hidden rounded-xl border border-line bg-panel transition duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_20px_50px_-20px] hover:shadow-accent/40"
          >
            {project.imageUrl ? (
              <div className="overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={`Screenshot of ${project.name}`}
                  loading="lazy"
                  className="aspect-video w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              </div>
            ) : (
              <div
                aria-hidden="true"
                className="flex aspect-video items-center justify-center bg-gradient-to-br from-accent/25 to-panel font-mono text-4xl text-accent-soft"
              >
                {'{ }'}
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-semibold text-white">{project.name}</h3>
              <p className="mt-3 flex-1 text-slate-300">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted">
                {project.stack.map((tech) => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
              {(project.liveUrl || project.githubUrl) && (
                <div className="mt-5 flex gap-5 text-sm font-semibold">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-accent hover:text-accent-soft">
                      Live site ↗
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-accent hover:text-accent-soft">
                      Source ↗
                    </a>
                  )}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
