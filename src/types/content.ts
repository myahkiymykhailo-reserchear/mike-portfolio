export type Locale = "en" | "uk";

export interface HeroStats {
  label: string;
  value: string;
}

export interface HeroContent {
  greeting: string;
  title: string;
  subtitle: string;
  description: string;
  stats: HeroStats[];
}

export interface ContactLink {
  label: string;
  href: string;
}

export interface ProfileContent {
  fullName: string;
  role: string;
  location: string;
  email: string;
  summary: string;
  links: ContactLink[];
}

export interface Milestone {
  period: string;
  title: string;
  organization: string;
  description: string;
}

export interface Publication {
  year: string;
  title: string;
  venue: string;
  link: string;
}

export interface TeachingDiscipline {
  name: string;
  level: string;
  years: string;
}

export interface TeachingHighlight {
  label: string;
  value: string;
}

export interface JobExperience {
  period: string;
  company: string;
  position: string;
  summary: string;
  achievements: string[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface HobbyItem {
  title: string;
  description: string;
}

export interface InterestMetric {
  area: string;
  score: number;
}

export interface SiteContent {
  hero: HeroContent;
  profile: ProfileContent;
  science: {
    intro: string;
    orcid: string;
    researchAreas: string[];
    milestones: Milestone[];
    publications: Publication[];
  };
  teaching: {
    intro: string;
    highlights: TeachingHighlight[];
    disciplines: TeachingDiscipline[];
    milestones: Milestone[];
  };
  professional: {
    intro: string;
    experiences: JobExperience[];
    skills: SkillGroup[];
  };
  personal: {
    intro: string;
    hobbies: HobbyItem[];
    metrics: InterestMetric[];
  };
}
