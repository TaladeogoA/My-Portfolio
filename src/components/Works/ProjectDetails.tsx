import { motion } from "framer-motion";
import React, { memo, useCallback } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ProjectDetailsProps } from "../../../types/project";
import { H1, H2, Text } from "../Common/Typography";

const ProjectDetails: React.FC<ProjectDetailsProps> = memo(
  ({ project, onNextProject, onPrevProject, hasNext, hasPrev }) => {
    const navigate = useNavigate();
    const isMobile = window.innerWidth < 1200;

    const handleBack = useCallback(() => {
      navigate("/works");
    }, [navigate]);

    return (
      <Container>
        {isMobile && (
          <MobileHeader>
            <BackButton onClick={handleBack}>
              <IoChevronBack size={24} />
              Back to Projects
            </BackButton>
          </MobileHeader>
        )}

        <Content
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isMobile && (
            <ImageCarousel>
              <img src={project.image} alt={project.title} />
            </ImageCarousel>
          )}

          <ContentSection>
            <H1>{project.title}</H1>

            <Links>
              {project.live && (
                <LinkButton
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>Visit Online</Text>
                </LinkButton>
              )}
              {project.source && (
                <LinkButton
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>Source Code</Text>
                </LinkButton>
              )}
            </Links>

            <Section>
              <H2>Problem</H2>
              <Text>{project.problem}</Text>
            </Section>

            <Section>
              <H2>Solution</H2>
              <Text>{project.solution}</Text>
            </Section>

            <Section>
              <H2>Technical Highlights</H2>
              <HighlightsList>
                {project.technicalHighlights.map((highlight, index) => (
                  <li key={index}>
                    <Text>{highlight}</Text>
                  </li>
                ))}
              </HighlightsList>
            </Section>

            {isMobile && (
              <NavigationButtons>
                {hasPrev && (
                  <NavButton onClick={onPrevProject}>
                    <BsArrowLeft size={20} />
                    Previous Project
                  </NavButton>
                )}
                {hasNext && (
                  <NavButton onClick={onNextProject} $alignRight>
                    Next Project
                    <BsArrowRight size={20} />
                  </NavButton>
                )}
              </NavigationButtons>
            )}
          </ContentSection>
        </Content>
      </Container>
    );
  }
);

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: #fff;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    height: calc(100vh - 60px);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const Content = styled(motion.div)`
  padding: 2rem;
  height: 100%;

  @media (max-width: 1200px) {
    padding: 0;
  }
`;

const MobileHeader = styled.div`
  position: sticky;
  top: 0;
  padding: 1rem;
  background: white;
  border-bottom: 1px solid #eee;
  z-index: 10;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem;
`;

const ImageCarousel = styled.div`
  width: 100vw;
  margin-left: -1rem;
  margin-right: -1rem;
  margin-bottom: 2rem;

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

const ContentSection = styled.div`
  padding: 0 1rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 3rem;
  padding-bottom: 2rem;
  gap: 1rem;
`;

const NavButton = styled.button<{ $alignRight?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
  background: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  ${(props) => props.$alignRight && "margin-left: auto;"}
`;

const Section = styled.div`
  margin: 2.5rem 0;
`;

const HighlightsList = styled.ul`
  padding-left: 1rem;
`;

const Links = styled.div`
  display: flex;
  gap: 1rem;
`;

const LinkButton = styled.a`
  color: black;
  font-size: 1rem;
  transition: text-decoration 0.3s;

  &:hover {
    text-decoration: none;
  }
`;

export default ProjectDetails;
