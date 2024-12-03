export interface Project {
  id: string;
  title: string;
  desc: string;
  tagline: string;
  tags: string;
  details: string;
  image: string;
  live: string;
  source: string;
  timeline: string;
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
