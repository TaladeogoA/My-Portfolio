import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { Project } from "../../../types/project";

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
            <h2>{project.title}</h2>
            <Description>{project.desc}</Description>
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
  color: ${({ isSelected }) => (isSelected ? "white" : "black")};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ isSelected }) => (isSelected ? "black" : "#f0f0f0")};
  }

  &:focus {
    outline: 2px solid #0066cc;
    outline-offset: -2px;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.4;
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #666;
`;

export default ProjectList;
