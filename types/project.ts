export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  technicalHighlights: string[];
  techStack: string;
  images: string[];
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
