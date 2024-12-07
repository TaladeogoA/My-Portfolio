import { motion } from "framer-motion";
import React, { memo } from "react";
import styled from "styled-components";
import { ProjectDetailsProps } from "../../../types/project";
import { H1, H2, Text } from "../Common/Typography";

const ProjectDetails: React.FC<ProjectDetailsProps> = memo(({ project }) => {
  return (
    <Container>
      <Content
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </Content>
    </Container>
  );
});

ProjectDetails.displayName = "ProjectDetails";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: #fff;
  color: #1a1a1a;
  border-right: 1px solid #e0e0e0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled(motion.div)`
  padding: 2rem;
  max-width: 800px;
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
