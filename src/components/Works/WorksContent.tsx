import React, { useState } from "react";
import styled from "styled-components";
import { Project } from "../../../types/project";
import { data as ProjectData } from "../../data/projectdata";
import ProjectDetails from "./ProjectDetails.tsx";
import ProjectImages from "./ProjectImages.tsx";
import ProjectList from "./ProjectList.tsx";

const WorksContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(
    ProjectData[0]
  );

  return (
    <Container>
      <ProjectList
        projects={ProjectData}
        selectedId={selectedProject.id}
        onSelectProject={setSelectedProject}
      />
      <ProjectDetails project={selectedProject} />
      <ProjectImages project={selectedProject} />
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  height: 100%;
  max-width: 92vw;
  position: absolute;
  left: 45%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  overflow: hidden;
`;

export default WorksContent;
