import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { Project } from "../../../types/project";
import { H2, Text } from "../Common/Typography";

interface ProjectListProps {
  projects: Project[];
  selectedId: string;
  onSelectProject: (project: Project) => void;
}

interface ProjectItemProps {
  isSelected: boolean;
}

const ProjectList: React.FC<ProjectListProps> = memo(
  ({ projects, selectedId, onSelectProject }) => {
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, project: Project) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelectProject(project);
        }
      },
      [onSelectProject]
    );

    if (!projects?.length) {
      return (
        <Container>
          <EmptyState>No projects available</EmptyState>
        </Container>
      );
    }

    return (
      <Container role="listbox" aria-label="Projects list" tabIndex={0}>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            isSelected={project.id === selectedId}
            onClick={() => onSelectProject(project)}
            role="option"
            aria-selected={project.id === selectedId}
            tabIndex={project.id === selectedId ? 0 : -1}
            onKeyDown={(e) => handleKeyDown(e, project)}
          >
            <H2>{project.title}</H2>
            <Description>
              <Text>{project.duration}</Text>
              <Text>{project.year}</Text>
            </Description>
          </ProjectItem>
        ))}
      </Container>
    );
  }
);

ProjectList.displayName = "ProjectList";

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  border-right: 1px solid black;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    outline: none;
  }
`;

const ProjectItem = styled.div<ProjectItemProps>`
  height: 30vh;
  padding: 2rem;
  cursor: pointer;
  border-bottom: 1px solid black;
  background: ${({ isSelected }) => (isSelected ? "black" : "white")};
  transition: all 0.3s ease;

  ${H2}, ${Text} {
    color: ${({ isSelected }) => (isSelected ? "white" : "black")};
    transition: color 0.3s ease;
  }

  &:hover {
    background: ${({ isSelected }) => (isSelected ? "black" : "#f0f0f0")};
  }
`;

const Description = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-top: 1rem;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
`;

export default ProjectList;
