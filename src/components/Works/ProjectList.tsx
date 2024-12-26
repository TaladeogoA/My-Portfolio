import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePreventScroll } from "../../hooks/usePreventScroll";
import { Project } from "../../types/project";
import { H2, Text } from "../Common/Typography";
import ProjectDetails from "./ProjectDetails";

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
    const isMobile = useMediaQuery("(max-width: 1200px)");
    const containerRef = useRef<HTMLDivElement>(null);
    const isFirstRender = useRef(true);
    usePreventScroll(!!selectedId);

    useEffect(() => {
      if (
        isFirstRender.current &&
        projects.length > 0 &&
        !selectedId &&
        isMobile
      ) {
        onSelectProject(projects[0]);
        isFirstRender.current = false;
      }
    }, [projects, selectedId, onSelectProject, isMobile]);

    const CLOSE_DURATION = 0.4;
    const TRANSITION_GAP = 0.2;
    const TOTAL_DURATION = (CLOSE_DURATION + TRANSITION_GAP) * 1000;

    const handleProjectClick = (project: Project, element: HTMLElement) => {
      const currentScroll = containerRef.current?.scrollTop || 0;

      if (selectedId && selectedId !== project.id) {
        onSelectProject({ id: "" } as Project);

        setTimeout(() => {
          onSelectProject(project);
          if (containerRef.current) {
            containerRef.current.scrollTop = currentScroll;
          }
        }, TOTAL_DURATION);
      } else {
        onSelectProject(project);
      }
    };

    return (
      <Container
        ref={containerRef}
        role="listbox"
        aria-label="Projects list"
        tabIndex={0}
      >
        {projects.map((project) => {
          const isExpanded = project.id === selectedId;

          return (
            <React.Fragment key={project.id}>
              <ProjectItem
                isSelected={isExpanded}
                onClick={(e) => handleProjectClick(project, e.currentTarget)}
                role="option"
                aria-selected={isExpanded}
                tabIndex={isExpanded ? 0 : -1}
              >
                <H2>{project.title}</H2>
                <Description>
                  <Text>{project.duration}</Text>
                  <Text>{project.year}</Text>
                </Description>
              </ProjectItem>

              {isMobile && (
                <AnimatePresence>
                  {isExpanded && (
                    <ExpandedContent
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{
                        height: 0,
                        transition: {
                          duration: CLOSE_DURATION,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <div style={{ overflow: "hidden", position: "relative" }}>
                        <ProjectDetails
                          project={project}
                          isMobileExpanded={true}
                        />
                      </div>
                    </ExpandedContent>
                  )}
                </AnimatePresence>
              )}
            </React.Fragment>
          );
        })}
      </Container>
    );
  }
);

ProjectList.displayName = "ProjectList";

const ExpandedContent = styled(motion.div)`
  overflow: hidden;
  background: #fff;
  border-bottom: 1px solid black;
`;

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
  height: clamp(100px, 28vh, 180px);
  padding: 2rem;
  cursor: pointer;
  border-bottom: 1px solid black;
  background: ${({ isSelected }) => (isSelected ? "black" : "white")};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    height: clamp(80px, 15vh, 120px);
    padding: 1.5rem;
  }

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

export default ProjectList;
