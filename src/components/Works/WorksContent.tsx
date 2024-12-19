import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Project } from "../../../types/project";
import { data as ProjectData } from "../../data/projectdata";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import ProjectDetails from "./ProjectDetails";
import ProjectImages from "./ProjectImages";
import ProjectList from "./ProjectList";

const WorksContent: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const isMobile = useMediaQuery("(max-width: 1200px)");

  const selectedProject =
    ProjectData.find((p) => p.id === projectId) || ProjectData[0];

  const handleProjectSelect = (project: Project) => {
    navigate(`/works/${project.id}`);
  };

  const projectIndex = ProjectData.findIndex(
    (p) => p.id === selectedProject.id
  );
  const hasNext = projectIndex < ProjectData.length - 1;
  const hasPrev = projectIndex > 0;

  const handleNextProject = () => {
    if (hasNext) {
      navigate(`/works/${ProjectData[projectIndex + 1].id}`);
    }
  };

  const handlePrevProject = () => {
    if (hasPrev) {
      navigate(`/works/${ProjectData[projectIndex - 1].id}`);
    }
  };

  return (
    <Container>
      {isMobile ? (
        projectId ? (
          <MobileDetailsView>
            <ProjectDetails
              project={selectedProject}
              onNextProject={handleNextProject}
              onPrevProject={handlePrevProject}
              hasNext={hasNext}
              hasPrev={hasPrev}
            />
          </MobileDetailsView>
        ) : (
          <ProjectList
            projects={ProjectData}
            selectedId={selectedProject.id}
            onSelectProject={handleProjectSelect}
          />
        )
      ) : (
        <DesktopLayout>
          <ProjectList
            projects={ProjectData}
            selectedId={selectedProject.id}
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
  overflow: hidden;
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

const MobileDetailsView = styled.div`
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

export default WorksContent;
