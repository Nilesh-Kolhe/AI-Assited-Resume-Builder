export interface CandidateInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

export interface ExperienceEntry {
  id: string;
  name: string;
  role: string;
  details: string;
  fromYear: string;
  toYear: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  link: string;
  technologies: string;
  description: string;
}

export interface ResumeData {
  candidate: CandidateInfo;
  experience: ExperienceEntry[];
  skills: string;
  projects: ProjectEntry[];
  achievements: string;
}

export interface TemplateOption {
  id: string;
  name: string;
  description: string;
  color: string;
  preview: string;
}
