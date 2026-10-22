// Mirrors the backend's PortfolioResponse records (GET /api/v1/portfolio)

export interface Profile {
  name: string
  headline: string
  tagline: string
  currentRole: string
  location: string
  email: string
  avatarUrl: string | null
  about: string[]
}

export interface Link {
  label: string
  url: string
}

export interface Experience {
  company: string
  title: string
  location: string
  /** First month, e.g. "2025-10" */
  start: string
  /** Last month, or null while the role is current */
  end: string | null
  highlights: string[]
}

export interface SkillGroup {
  category: string
  items: string[]
}

export interface Project {
  name: string
  description: string
  stack: string[]
  imageUrl: string | null
  liveUrl: string | null
  githubUrl: string | null
}

export interface Education {
  institution: string
  degree: string
  minor: string | null
  startYear: number
  endYear: number
  cgpa: string | null
}

export interface Portfolio {
  profile: Profile
  links: Link[]
  experience: Experience[]
  skills: SkillGroup[]
  projects: Project[]
  education: Education[]
  achievements: string[]
}

export interface ContactForm {
  name: string
  email: string
  message: string
  /** Honeypot: stays empty for real visitors */
  website: string
}
