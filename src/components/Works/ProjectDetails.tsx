import React from "react";
import styled from "styled-components";
import { ProjectDetailsProps } from "../../../types/project";

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <Container>
      <Content>
        <h1>{project.title}</h1>
        <p>{project.tagline}</p>
        <Description>{project.details}</Description>
        <Technologies>
          <h3>Technologies</h3>
          <p>{project.tags}</p>
        </Technologies>
        <Timeline>
          <h3>Timeline</h3>
          <p>{project.timeline}</p>
        </Timeline>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: #f5f5f5;
  color: #1a1a1a;
  border-right: 1px solid #e0e0e0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Content = styled.div`
  padding: 2rem;

  h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  p {
    font-size: 1.5rem;
    line-height: 1.6;
  }
`;

const Description = styled.p`
  margin: 2rem 0;
`;

const Technologies = styled.div`
  margin: 2rem 0;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const Timeline = styled(Technologies)``;

export default ProjectDetails;
