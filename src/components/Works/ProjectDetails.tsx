import { motion } from "framer-motion";
import React, { memo } from "react";
import { FaAndroid, FaApple, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Project, ProjectDetailsProps } from "../../types/project";
import { VisuallyHidden } from "../Common/VisuallyHidden";
import ProjectGallery from "./ProjectGallery";

interface ExternalLinkProps {
  href: string;
  label: string;
  children: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  label,
  children,
}) => (
  <ExternalAnchor href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <span>{label}</span>
    <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
  </ExternalAnchor>
);

const ProjectLinks: React.FC<{ project: Project }> = ({ project }) => {
  if (!project.live && !project.appStoreUrl && !project.playStoreUrl) {
    return null;
  }

  return (
    <LinksRow>
      {project.live && (
        <ExternalLink href={project.live} label="Website">
          <FaGlobe size={14} aria-hidden="true" />
        </ExternalLink>
      )}
      {project.appStoreUrl && (
        <ExternalLink href={project.appStoreUrl} label="App Store">
          <FaApple size={16} aria-hidden="true" />
        </ExternalLink>
      )}
      {project.playStoreUrl && (
        <ExternalLink href={project.playStoreUrl} label="Google Play">
          <FaAndroid size={16} aria-hidden="true" />
        </ExternalLink>
      )}
    </LinksRow>
  );
};

const NextProject: React.FC<{ project: Project }> = ({ project }) => (
  <NextLink to={`/work/${project.id}`} replace>
    <span className="eyebrow">Next project</span>
    <span className="name">
      {project.title} <span aria-hidden="true">→</span>
    </span>
  </NextLink>
);

const ProjectDetails: React.FC<ProjectDetailsProps> = memo(
  ({ project, isMobileExpanded, nextProject }) => {
    const highlights = project.technicalHighlights.slice(0, 3);

    const summary = (
      <>
        <Lede>{project.shortDescription}</Lede>

        <Facts>
          <div>
            <dt>Built with</dt>
            <dd>{project.techStack}</dd>
          </div>
        </Facts>

        <Highlights aria-label="What I built">
          {highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </Highlights>

        <ProjectLinks project={project} />

        {nextProject && <NextProject project={nextProject} />}
      </>
    );

    if (isMobileExpanded) {
      return (
        <MobileExpandedContent>
          {project.assets.length > 0 && (
            <GalleryWrap>
              <ProjectGallery assets={project.assets} label={project.title} />
            </GalleryWrap>
          )}
          <ContentSection>{summary}</ContentSection>
        </MobileExpandedContent>
      );
    }

    return (
      <Container>
        <Content
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <ContentSection>
            <Eyebrow>
              <span>{project.id}</span>
              <span>{project.title}</span>
            </Eyebrow>
            <Title>{project.subtitle}</Title>
            {summary}
          </ContentSection>
        </Content>
      </Container>
    );
  }
);

ProjectDetails.displayName = "ProjectDetails";

const GalleryWrap = styled.div`
  padding-top: 1.25rem;
`;

const MobileExpandedContent = styled.div`
  padding-bottom: 2rem;
`;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: #f8f7f4;
  box-shadow: inset 1px 0 0 #000;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ContentBase = styled.div`
  padding: 2.5rem 2.5rem 1rem;
`;

const Content = motion(ContentBase);

const ContentSection = styled.div`
  padding: 0 1.5rem;
  max-width: 640px;

  @media (max-width: 768px) {
    padding: 1.5rem 1rem 0;
    max-width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.75rem;
  line-height: 1.2;
  font-weight: 600;
  margin: 0 0 1.5rem;
  text-wrap: balance;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Lede = styled.p`
  font-size: 1.0625rem;
  line-height: 1.65;
  color: rgba(0, 0, 0, 0.82);
  margin: 0 0 2rem;
  text-wrap: pretty;
`;

const Facts = styled.dl`
  margin: 0 0 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.12);

  > div {
    display: grid;
    grid-template-columns: 6.5rem 1fr;
    gap: 1rem;
    padding: 0.875rem 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }

  dt {
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.66);
    padding-top: 0.125rem;
  }

  dd {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.55;
    color: rgba(0, 0, 0, 0.82);
  }
`;

const Highlights = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    position: relative;
    padding-left: 1.25rem;
    margin-bottom: 0.75rem;
    font-size: 0.9375rem;
    line-height: 1.55;
    color: rgba(0, 0, 0, 0.82);

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 0.65em;
      width: 0.5rem;
      height: 1px;
      background: #000;
    }
  }
`;

const Eyebrow = styled.p`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.66);

  span:first-child {
    font-variant-numeric: tabular-nums;
  }
`;

const LinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 1.5rem;
  margin: 1.5rem 0 0;
`;

const ExternalAnchor = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  font-size: 0.9375rem;
  color: #000;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  transition: text-underline-offset 0.2s ease;

  @media (hover: hover) {
    &:hover {
      text-underline-offset: 6px;
    }
  }
`;

const NextLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin: 1rem 0 2rem;
  padding: 1.25rem 0;
  border-top: 1px solid #000;
  color: #000;
  text-decoration: none;

  .eyebrow {
    font-size: 0.8125rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.66);
  }

  .name {
    font-size: 1.25rem;
    font-weight: 600;

    span {
      display: inline-block;
      transition: transform 0.2s ease;
    }
  }

  @media (hover: hover) {
    &:hover .name span {
      transform: translateX(0.25rem);
    }
  }
`;

export default ProjectDetails;
