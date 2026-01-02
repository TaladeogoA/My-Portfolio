export interface Asset {
  type: "image" | "video";
  url: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  contribution:  string;
  technicalHighlights: string[];
  impact?:  ImpactMetric[];
  techStack: string;
  assets: Asset[];
  live?:  string;
  source?: string;
  appStoreUrl?: string;
  playStoreUrl?:  string;
  duration:  string;
  year: string;
}

export interface ProjectListProps {
  projects: Project[];
  selectedId: string;
  onSelectProject: (project: Project) => void;
}

export interface ProjectDetailsProps {
  project: Project;
  isMobileExpanded?: boolean;
}

export interface ProjectImagesProps {
  project: Project;
}

export interface Asset {
  type: "image" | "video";
  url: string;
}
