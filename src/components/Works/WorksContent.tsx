import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { data as ProjectData } from "../../data/projectdata";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Project } from "../../types/project";
import { MetaTags } from "../SEO/MetaTags";
import ProjectDetails from "./ProjectDetails";
import ProjectImages from "./ProjectImages";
import ProjectList from "./ProjectList";

const WorksContent: FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string>(
    projectId && ProjectData.some((project) => project.id === projectId)
      ? projectId
      : ProjectData[0]?.id || ""
  );
  const isMobile = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    ProjectData.forEach((project) => {
      project.assets.forEach((asset) => {
        const img = new Image();
        img.src = asset.url;
      });
    });
  }, []);

  const selectedProject =
    ProjectData.find((p) => p.id === selectedId) || ProjectData[0];

  useEffect(() => {
    if (projectId && ProjectData.some((project) => project.id === projectId)) {
      setSelectedId(projectId);
    }
  }, [projectId]);

  const handleProjectSelect = (project: Project) => {
    const isDeselecting = isMobile && project.id === selectedId;

    if (isDeselecting) {
      setSelectedId("");
      navigate("/work");
      return;
    }

    setSelectedId(project.id);
    navigate(`/work/${project.id}`);
  };

  return (
    <>
      <MetaTags
        title={
          selectedProject
            ? `${selectedProject.title} | Work | Talade`
            : "Work | Talade"
        }
        description={
          selectedProject
            ? selectedProject.description
            : "Selected product engineering work across web and mobile, focused on making complex workflows feel simple."
        }
      />
      <Container>
        {isMobile ? (
          <ProjectList
            projects={ProjectData}
            selectedId={selectedId}
            onSelectProject={handleProjectSelect}
          />
        ) : (
          <DesktopLayout>
            <ProjectList
              projects={ProjectData}
              selectedId={selectedId}
              onSelectProject={handleProjectSelect}
            />
            <ProjectDetails project={selectedProject} />
            <ProjectImages project={selectedProject} />
          </DesktopLayout>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  overflow: hidden;

  @media (max-width: 1200px) {
    height: calc(100dvh - 60px);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const DesktopLayout = styled.div`
  display: none;
  height: 100%;
  grid-template-columns: minmax(240px, 0.7fr) minmax(320px, 1fr) minmax(
      280px,
      1fr
    );

  @media (min-width: 1200px) {
    display: grid;
  }
`;

export default WorksContent;
