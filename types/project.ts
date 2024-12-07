export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  technicalHighlights: string[];
  techStack: string;
  image: string;
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
}

export interface ProjectImagesProps {
  project: Project;
}
