export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  contribution: string;
  technicalHighlights: string[];
  techStack: string;
  assets: Asset[];
  live?: string;
  source?: string;
  duration: string;
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
