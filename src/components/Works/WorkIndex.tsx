import React, { lazy, Suspense, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Resume from "../../assets/Taladeogo-Abraham-Resume.pdf";
import { Project } from "../../types/project";
import { ArrowIcon, HOVER, INK, LINE, LinkIcon, MUTED } from "../Common/theme";
import { VisuallyHidden } from "../Common/VisuallyHidden";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useScrollChoreography } from "../../hooks/useScrollChoreography";

const HoverPreview = lazy(() => import("../Effects/HoverPreview"));

const PREVIEW_QUERY =
  "(hover: hover) and (pointer: fine) and (min-width: 993px) and (prefers-reduced-motion: no-preference)";

interface WorkIndexProps {
  projects: Project[];
}

const yearRange = (projects: Project[]) => {
  const years = projects
    .flatMap((p) => p.period.match(/\d{4}/g) ?? [])
    .map(Number);
  return years.length ? Math.min(...years) : null;
};

const WorkIndex: React.FC<WorkIndexProps> = ({ projects }) => {
  const firstYear = yearRange(projects);
  const pageRef = useRef<HTMLDivElement>(null);
  useScrollChoreography(pageRef);
  const canPreview = useMediaQuery(PREVIEW_QUERY);
  const [hovered, setHovered] = useState<string | null>(null);
  const previewItems = useMemo(
    () =>
      projects
        .filter((p) => p.assets[0]?.type === "image")
        .map((p) => ({ id: p.id, url: p.assets[0].url })),
    [projects]
  );

  return (
    <Page ref={pageRef}>
      <Header>
        <Intro>
          <Title data-split aria-label="Work">Work</Title>
          <Lede data-fade>
            Product engineering across healthcare, pharmacy operations and B2B
            tools, on web and mobile.
          </Lede>
        </Intro>
        <ContactBadge to="/contact" aria-label="Get in touch">
          <Ring viewBox="0 0 132 132" aria-hidden="true">
            <defs>
              <path
                id="work-badge-circle"
                d="M66,66 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"
              />
            </defs>
            <text>
              <textPath
                href="#work-badge-circle"
                textLength="320"
                lengthAdjust="spacing"
              >
                GET IN TOUCH • GET IN TOUCH •
              </textPath>
            </text>
          </Ring>
          <BadgeArrow>
            <ArrowIcon />
          </BadgeArrow>
        </ContactBadge>
      </Header>

      <section aria-labelledby="selected-projects">
        <SectionHead data-fade>
          <h2 id="selected-projects">Selected projects</h2>
          {firstYear && <span>{firstYear} — now</span>}
        </SectionHead>

        <List data-stagger onMouseLeave={() => setHovered(null)}>
          {projects.map((project) => (
            <li key={project.id}>
              <Row
                to={`/work/${project.id}`}
                onMouseEnter={() => setHovered(project.id)}
              >
                {project.assets[0]?.type === "image" && (
                  <Thumb
                    aria-hidden="true"
                    data-clip
                    style={{
                      aspectRatio:
                        project.assets[0].width && project.assets[0].height
                          ? `${project.assets[0].width} / ${project.assets[0].height}`
                          : undefined,
                    }}
                  >
                    <img src={project.assets[0].url} alt="" loading="lazy" />
                  </Thumb>
                )}
                <Num aria-hidden="true">{project.id}</Num>
                <Main>
                  <Name>{project.title}</Name>
                  <Blurb>{project.shortDescription}</Blurb>
                </Main>
                <Meta>
                  <span>{project.role}</span>
                  <span className="muted">
                    {project.period} · {project.platforms}
                  </span>
                </Meta>
                <Arrow>
                  <ArrowIcon />
                </Arrow>
              </Row>
            </li>
          ))}
        </List>

        <Footnote data-fade>
          Earlier roles and the full history are in my{" "}
          <a href={Resume} target="_blank" rel="noopener noreferrer">
            résumé
            <LinkIcon />
            <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
          </a>
        </Footnote>
      </section>

      {canPreview && previewItems.length > 0 && (
        <Suspense fallback={null}>
          <HoverPreview items={previewItems} activeId={hovered} />
        </Suspense>
      )}
    </Page>
  );
};

const Page = styled.div`
  align-self: flex-start;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 6rem 4rem 5rem;
  box-sizing: border-box;
  color: ${INK};
  display: flex;
  flex-direction: column;
  gap: 5.5rem;

  @media (max-width: 992px) {
    padding: 3.5rem 1.5rem 3rem;
    gap: 3rem;
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 520px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 4rem;
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.03em;

  @media (max-width: 992px) {
    font-size: 3rem;
  }
`;

const Lede = styled.p`
  margin: 0;
  font-size: 1.1875rem;
  line-height: 1.55;
  color: ${MUTED};
  text-wrap: pretty;

  @media (max-width: 992px) {
    font-size: 1.0625rem;
  }
`;

const ContactBadge = styled(Link)`
  position: relative;
  flex-shrink: 0;
  width: 132px;
  height: 132px;
  color: ${INK};

  &:focus-visible {
    outline: 2px solid ${INK};
    outline-offset: 4px;
    border-radius: 50%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Ring = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  animation: work-badge-spin 18s linear infinite;

  text {
    font-family: "Kodchasan", sans-serif;
    font-size: 11.5px;
    font-weight: 600;
    fill: currentColor;
  }

  @keyframes work-badge-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const BadgeArrow = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

const SectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1.25rem;

  h2 {
    margin: 0;
    font-size: 1.375rem;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  span {
    font-size: 0.875rem;
    color: ${MUTED};
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${LINE};
`;

const Arrow = styled.span`
  display: flex;
  font-size: 20px;

  @media (max-width: 992px) {
    display: none;
  }
`;

const Row = styled(Link)`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 250px 28px;
  gap: 1.5rem;
  align-items: center;
  padding: 1.75rem 1rem;
  margin: 0 -1rem;
  border-bottom: 1px solid ${LINE};
  border-radius: 4px;
  color: ${INK};
  text-decoration: none;
  transition: background 0.2s ease;

  @media (hover: hover) {
    &:hover {
      background: ${HOVER};
    }
  }

  &:focus-visible {
    outline: 2px solid ${INK};
    outline-offset: -2px;
  }

  @media (max-width: 992px) {
    grid-template-columns: minmax(0, 1fr) auto;
    grid-template-areas:
      "thumb thumb"
      "main num"
      "meta meta";
    gap: 0.5rem 1rem;
    padding: 1.375rem 0;
    margin: 0;
  }
`;

// Phones get a screenshot in each row instead of the hover preview.
const Thumb = styled.span`
  display: none;

  @media (max-width: 992px) {
    grid-area: thumb;
    display: block;
    margin-bottom: 0.75rem;
    aspect-ratio: 16 / 10;
    border-radius: 6px;
    overflow: hidden;
    background: ${HOVER};
    border: 1px solid ${LINE};

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`;

const Num = styled.span`
  align-self: start;
  padding-top: 0.4rem;
  font-size: 0.875rem;
  color: ${MUTED};
  font-variant-numeric: tabular-nums;

  @media (max-width: 992px) {
    grid-area: num;
    padding-top: 0.5rem;
  }
`;

const Main = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  min-width: 0;

  @media (max-width: 992px) {
    grid-area: main;
  }
`;

const Name = styled.span`
  font-size: 1.625rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;

  @media (max-width: 992px) {
    font-size: 1.4375rem;
  }
`;

const Blurb = styled.span`
  font-size: 1rem;
  line-height: 1.5;
  color: ${MUTED};
  text-wrap: pretty;

  @media (max-width: 992px) {
    font-size: 0.9375rem;
  }
`;

const Meta = styled.span`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: right;
  font-size: 0.9375rem;

  .muted {
    font-size: 0.875rem;
    color: ${MUTED};
  }

  @media (max-width: 992px) {
    grid-area: meta;
    display: block;
    text-align: left;
    font-size: 0.875rem;
    line-height: 1.5;
    padding-top: 0.25rem;

    .muted::before {
      content: " · ";
    }
  }
`;

const Footnote = styled.p`
  margin: 1.5rem 0 0;
  font-size: 1rem;
  color: ${MUTED};

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    color: ${INK};
    font-weight: 500;
    text-underline-offset: 4px;
  }
`;

export default WorkIndex;
