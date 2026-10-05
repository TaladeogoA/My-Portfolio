export interface Asset {
  type: "image" | "video";
  url: string;
  alt?: string;
  width?: number;
  height?: number;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  constraints: string;
  contribution:  string;
  decisions: string;
  technicalHighlights: string[];
  techStack: string;
  assets: Asset[];
  live?:  string;
  source?: string;
  appStoreUrl?: string;
  playStoreUrl?:  string;
  period: string;
}

export interface ProjectDetailsProps {
  project: Project;
  isMobileExpanded?: boolean;
  nextProject?: Project;
}

export interface ProjectImagesProps {
  project: Project;
}
