import { About } from './components/About'
import { Contact } from './components/Contact'
import { ExperienceSection } from './components/ExperienceSection'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { useReveal, useSpotlight } from './effects'
import { usePortfolio } from './usePortfolio'

export default function App() {
  const portfolio = usePortfolio()
  const { profile } = portfolio
  useReveal(portfolio)
  useSpotlight()

  return (
    <>
      <Header name={profile.name} />
      <main>
        <Hero profile={profile} links={portfolio.links} />
        <About profile={profile} education={portfolio.education} />
        <ExperienceSection experience={portfolio.experience} achievements={portfolio.achievements} />
        <Skills skills={portfolio.skills} />
        <Projects projects={portfolio.projects} />
        <Contact email={profile.email} />
      </main>
      <Footer name={profile.name} />
    </>
  )
}
