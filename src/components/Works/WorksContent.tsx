import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { data as ProjectData } from "../../data/projectdata";
import { MetaTags } from "../SEO/MetaTags";
import ProjectCaseStudy from "./ProjectCaseStudy";
import WorkIndex from "./WorkIndex";

const WorksContent: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const index = ProjectData.findIndex((project) => project.id === projectId);
  const project = index >= 0 ? ProjectData[index] : undefined;

  useEffect(() => {
    if (projectId && !project) {
      navigate("/work", { replace: true });
    }
  }, [projectId, project, navigate]);

  if (project) {
    return (
      <>
        <MetaTags
          title={`${project.title} | Work | Talade`}
          description={project.shortDescription}
        />
        <ProjectCaseStudy
          key={project.id}
          project={project}
          index={index}
          total={ProjectData.length}
          nextProject={ProjectData[(index + 1) % ProjectData.length]}
        />
      </>
    );
  }

  return (
    <>
      <MetaTags
        title="Work | Talade"
        description="Selected product engineering work across web and mobile, including B2B platforms, healthcare products and operational tools."
      />
      <WorkIndex projects={ProjectData} />
    </>
  );
};

export default WorksContent;
