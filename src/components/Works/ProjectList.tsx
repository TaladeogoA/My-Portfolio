import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Project } from "../../types/project";
import ProjectDetails from "./ProjectDetails";

interface ProjectListProps {
  projects: Project[];
  selectedId: string;
  onSelectProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = memo(
  ({ projects, selectedId, onSelectProject }) => {
    const isAccordion = useMediaQuery("(max-width: 1200px)");
    const itemRefs = useRef<Record<string, HTMLLIElement | null>>({});

    useEffect(() => {
      if (!isAccordion || !selectedId) return;
      const element = itemRefs.current[selectedId];
      if (!element) return;
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const timer = window.setTimeout(() => {
        element.scrollIntoView({
          block: "start",
          behavior: reduce ? "auto" : "smooth",
        });
      }, 320);
      return () => window.clearTimeout(timer);
    }, [selectedId, isAccordion]);

    const renderLabel = (project: Project, isSelected: boolean) => (
      <>
        <Header>
          <ProjectNumber $selected={isSelected}>{project.id}</ProjectNumber>
          <TitleWrapper>
            <Title>{project.title}</Title>
            <Subtitle $selected={isSelected}>{project.subtitle}</Subtitle>
          </TitleWrapper>
          {isAccordion && (
            <Toggle aria-hidden="true">{isSelected ? "−" : "+"}</Toggle>
          )}
        </Header>
        <Footer $selected={isSelected}>
          <span>{project.period}</span>
        </Footer>
      </>
    );

    return (
      <Container
        as={isAccordion ? "div" : "nav"}
        aria-label={isAccordion ? undefined : "Projects"}
      >
        <List>
          {projects.map((project, index) => {
            const isSelected = project.id === selectedId;
            const next = projects[(index + 1) % projects.length];
            const panelId = `project-panel-${project.id}`;

            return (
              <li
                key={project.id}
                ref={(el) => {
                  itemRefs.current[project.id] = el;
                }}
              >
                {isAccordion ? (
                  <>
                    <AccordionHeading>
                      <ItemButton
                        type="button"
                        $selected={isSelected}
                        aria-expanded={isSelected}
                        aria-controls={panelId}
                        onClick={() => onSelectProject(project)}
                      >
                        {renderLabel(project, isSelected)}
                      </ItemButton>
                    </AccordionHeading>
                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <ExpandedContent
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <ProjectDetails
                            project={project}
                            nextProject={next}
                            isMobileExpanded
                          />
                        </ExpandedContent>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <ItemLink
                    to={`/work/${project.id}`}
                    $selected={isSelected}
                    aria-current={isSelected ? "page" : undefined}
                  >
                    {renderLabel(project, isSelected)}
                  </ItemLink>
                )}
              </li>
            );
          })}
        </List>
      </Container>
    );
  }
);

ProjectList.displayName = "ProjectList";

const itemStyles = css<{ $selected: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: clamp(160px, 28vh, 200px);
  padding: 2rem;
  border-bottom: 1px solid #000;
  background: ${({ $selected }) => ($selected ? "#000" : "#F8F7F4")};
  color: ${({ $selected }) => ($selected ? "#F8F7F4" : "#000")};
  text-decoration: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease;

  @media (max-width: 768px) {
    min-height: clamp(140px, 22vh, 180px);
    padding: 1.5rem;
    gap: 1.25rem;
  }

  @media (hover: hover) {
    &:hover {
      background: ${({ $selected }) => ($selected ? "#000" : "#ECEBE7")};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ $selected }) => ($selected ? "#F8F7F4" : "#000")};
    outline-offset: -8px;
  }
`;

const ItemLink = styled(Link)<{ $selected: boolean }>`
  ${itemStyles}
`;

const ItemButton = styled.button<{ $selected: boolean }>`
  ${itemStyles}
`;

const AccordionHeading = styled.h2`
  font-size: inherit;
  font-weight: inherit;
  margin: 0;
`;

const ExpandedContent = styled(motion.div)`
  overflow: hidden;
  background: #f8f7f4;
  border-bottom: 1px solid #000;
`;

const Container = styled.div`
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Header = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const ProjectNumber = styled.span<{ $selected: boolean }>`
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  font-variant-numeric: tabular-nums;
  color: ${({ $selected }) =>
    $selected ? "rgba(248, 247, 244, 0.72)" : "rgba(0, 0, 0, 0.66)"};
  flex-shrink: 0;
  padding-top: 0.4rem;
`;

const TitleWrapper = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
  min-width: 0;
`;

const Title = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.3;
`;

const Subtitle = styled.span<{ $selected: boolean }>`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ $selected }) =>
    $selected ? "rgba(248, 247, 244, 0.8)" : "rgba(0, 0, 0, 0.7)"};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Toggle = styled.span`
  flex-shrink: 0;
  font-size: 1.5rem;
  line-height: 1;
  font-weight: 300;
`;

const Footer = styled.span<{ $selected: boolean }>`
  display: flex;
  padding-top: 1rem;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  border-top: 1px solid
    ${({ $selected }) =>
      $selected ? "rgba(248, 247, 244, 0.22)" : "rgba(0, 0, 0, 0.12)"};
  color: ${({ $selected }) =>
    $selected ? "rgba(248, 247, 244, 0.72)" : "rgba(0, 0, 0, 0.66)"};
`;

export default ProjectList;
