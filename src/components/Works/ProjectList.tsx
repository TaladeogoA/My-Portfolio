import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import React, { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { usePreventScroll } from "../../hooks/usePreventScroll";
import { Project } from "../../types/project";
import { H2 } from "../Common/Typography";
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

    const handleProjectClick = (project: Project) => {
      onSelectProject(project);
    };

    return (
      <Container
        ref={containerRef}
        role="listbox"
        aria-label="Projects list"
        tabIndex={0}
      >
        <LayoutGroup>
          {projects.map((project) => {
            const isExpanded = project.id === selectedId;
            const techStack = project.techStack
              ? project.techStack.split(" • ").slice(0, 3)
              : [];

            return (
              <React.Fragment key={project.id}>
                <ProjectItem
                  layout
                  isSelected={isExpanded}
                  onClick={() => handleProjectClick(project)}
                  role="option"
                  aria-selected={isExpanded}
                  tabIndex={isExpanded ? 0 : -1}
                  transition={{ layout: { duration: 0.3, ease: "easeInOut" } }}
                >
                  <Header>
                    <ProjectNumber isSelected={isExpanded}>
                      {project.id}
                    </ProjectNumber>
                    <TitleWrapper>
                      <H2>{project.title}</H2>
                      <Subtitle isSelected={isExpanded}>
                        {project.subtitle}
                      </Subtitle>
                    </TitleWrapper>
                  </Header>
                  <Footer>
                    <FooterText isSelected={isExpanded}>
                      {project.duration}
                    </FooterText>
                    <FooterText isSelected={isExpanded}>
                      {project.year}
                    </FooterText>
                  </Footer>
                </ProjectItem>

                {isMobile && (
                  <AnimatePresence>
                    {isExpanded && (
                      <ExpandedContent
                        layout
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            duration: 0.3,
                            ease: "easeInOut",
                          },
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                      >
                        <div
                          style={{ overflow: "hidden", position: "relative" }}
                        >
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
        </LayoutGroup>
      </Container>
    );
  }
);

ProjectList.displayName = "ProjectList";

const ExpandedContent = styled(motion.div)`
  overflow: hidden;
  background: #f8f7f4;
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

const ProjectItem = styled(motion.div)<ProjectItemProps>`
  min-height: clamp(160px, 28vh, 200px);
  padding: 2rem;
  cursor: pointer;
  border-bottom: 1px solid black;
  background: ${({ isSelected }) => (isSelected ? "black" : "#F8F7F4")};
  transition: background 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  @media (max-width: 768px) {
    min-height: clamp(140px, 22vh, 180px);
    padding: 1.5rem;
    gap: 1.25rem;
  }

  ${H2} {
    color: ${({ isSelected }) => (isSelected ? "#F8F7F4" : "black")};
    transition: color 0.3s ease;
    font-size: 1.25rem;
    line-height: 1.3;
  }

  &:hover {
    background: ${({ isSelected }) => (isSelected ? "black" : "#E8E7E4")};
  }
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const ProjectNumber = styled.span<{ isSelected: boolean }>`
  font-family: "Neue Montreal", sans-serif;
  font-size: 0.75rem;
  opacity: 0.4;
  color: ${({ isSelected }) => (isSelected ? "#F8F7F4" :  "black")};
  transition: color 0.3s ease;
  flex-shrink: 0;
  padding-top: 0.25rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

const Subtitle = styled.span<{ isSelected: boolean }>`
  font-family: "Neue Montreal", sans-serif;
  font-size: 0.875rem;
  opacity: 0.6;
  color: ${({ isSelected }) => (isSelected ? "#F8F7F4" :  "black")};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.3s ease;
  line-height: 1.5;
`;

const Footer = styled.div`
  display: flex;
  justify-content:  space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const FooterText = styled. span<{ isSelected: boolean }>`
  font-family: "Neue Montreal", sans-serif;
  font-size: 0.75rem;
  color: ${({ isSelected }) => (isSelected ? "#F8F7F4" : "black")};
  opacity: 0.5;
  transition: color 0.3s ease;
`;

export default ProjectList;