export interface Project {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  glowColor: string;
}

export interface Skill {
  name: string;
  category: "Frontend" | "Programming" | "Database" | "Tools" | "Data & AI";
  level: number; // percentage, e.g. 90
  glow: string; // hex color for neon look
  description: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  credentialUrl?: string;
  glowColor: string;
  date?: string;
}

export interface EducationTimelineItem {
  year: string;
  institution: string;
  degree: string;
  gpa: string;
  location: string;
  details: string[];
}
