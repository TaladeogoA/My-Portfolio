import React, { useState } from "react";
import styled from "styled-components";
import { Project } from "../../../types/project";
import { data as ProjectData } from "../../data/projectdata";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ProjectDetails from "./ProjectDetails";
import ProjectImages from "./ProjectImages";
import ProjectList from "./ProjectList";

const WorksContent: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>("");
  const isMobile = useMediaQuery("(max-width: 1200px)");

  const selectedProject =
    ProjectData.find((p) => p.id === selectedId) || ProjectData[0];

  const handleProjectSelect = (project: Project) => {
    if (isMobile) {
      setSelectedId(project.id === selectedId ? "" : project.id);
    } else {
      setSelectedId(project.id);
    }
  };

  return (
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
  grid-template-columns: minmax(300px, 1fr) minmax(400px, 2fr) minmax(
      300px,
      1fr
    );

  @media (min-width: 1200px) {
    display: grid;
  }
`;

export default WorksContent;
