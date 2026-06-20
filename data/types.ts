export type WorkHeight = "compact" | "standard" | "tall";

export interface Project {
  id: number;
  image: string;
  alt: string;
  client: string;
  title: string;
  sourceCredit: string;
  focalPosition: string;
  fallbackLabel: string;
}

export interface WorkRow {
  id: number;
  height: WorkHeight;
  projects: Project[];
}

export interface PageHeroContent {
  eyebrow: string;
  title: string;
  manifesto: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  summary: string;
  date: string;
  image: string;
}

export interface Role {
  title: string;
  discipline: string;
  location: string;
  type: string;
}
