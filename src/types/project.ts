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
  /** Short role label shown in the Work list, e.g. "Founding mobile engineer". */
  role: string;
  /** Where it shipped, e.g. "iOS · Android · Web". */
  platforms: string;
  assets: Asset[];
  live?:  string;
  source?: string;
  appStoreUrl?: string;
  playStoreUrl?:  string;
  period: string;
}
