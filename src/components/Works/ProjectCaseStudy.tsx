import React, { useEffect, useRef, useState } from "react";
import { FaAndroid, FaApple, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Asset, Project } from "../../types/project";
import { VisuallyHidden } from "../Common/VisuallyHidden";
import ImageModal from "./ImageModal";
import { OptimizedImage } from "./OptimizedImage";

interface ProjectCaseStudyProps {
  project: Project;
  index: number;
  total: number;
  nextProject: Project;
}

const pad = (n: number) => String(n).padStart(2, "0");

const Shot: React.FC<{
  asset: Asset;
  eager?: boolean;
  onOpen: (asset: Asset) => void;
}> = ({ asset, eager, onOpen }) => (
  <Figure>
    <ShotButton
      type="button"
      onClick={() => onOpen(asset)}
      style={{
        aspectRatio:
          asset.width && asset.height
            ? `${asset.width} / ${asset.height}`
            : "16 / 10",
      }}
    >
      {asset.type === "video" ? (
        <video src={asset.url} autoPlay muted loop playsInline />
      ) : (
        <OptimizedImage
          src={asset.url}
          alt={asset.alt ?? ""}
          width={asset.width}
          height={asset.height}
          loading={eager ? "eager" : "lazy"}
        />
      )}
      <VisuallyHidden>Enlarge image</VisuallyHidden>
    </ShotButton>
    {asset.alt && <figcaption>{asset.alt}</figcaption>}
  </Figure>
);

const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  project,
  index,
  total,
  nextProject,
}) => {
  const [openAsset, setOpenAsset] = useState<Asset | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  // PageLayout only resets scroll between top-level pages, so moving
  // from the list or between projects has to do it here.
  useEffect(() => {
    document.getElementById("main-content")?.scrollTo({ top: 0, left: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [project.id]);

  const [hero, ...rest] = project.assets;
  const sections = [
    { title: "Overview", body: project.description },
    { title: "The problem", body: project.constraints },
    { title: "What I did", body: project.contribution },
    { title: "Decisions", body: project.decisions },
  ];
  const links = [
    project.live && { href: project.live, label: "Website", icon: <FaGlobe size={14} /> },
    project.appStoreUrl && { href: project.appStoreUrl, label: "App Store", icon: <FaApple size={16} /> },
    project.playStoreUrl && { href: project.playStoreUrl, label: "Google Play", icon: <FaAndroid size={16} /> },
  ].filter(Boolean) as { href: string; label: string; icon: React.ReactNode }[];

  return (
    <Article>
      <TopRow>
        <BackLink to="/work">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          All work
        </BackLink>
        <span>
          {pad(index + 1)} / {pad(total)}
        </span>
      </TopRow>

      <header>
        <Title ref={headingRef} tabIndex={-1}>
          {project.title}
        </Title>
        <Subtitle>{project.subtitle}</Subtitle>
        <Lede>{project.shortDescription}</Lede>

        <Facts>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>
              {project.period} · {project.platforms}
            </dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.techStack.split(" • ").join(", ")}</dd>
          </div>
        </Facts>

        {links.length > 0 && (
          <Links>
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span aria-hidden="true">{link.icon}</span>
                {link.label}
                <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
              </a>
            ))}
          </Links>
        )}
      </header>

      {hero && <Shot asset={hero} eager onOpen={setOpenAsset} />}

      {sections.slice(0, 3).map((section) => (
        <Section key={section.title}>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </Section>
      ))}

      {rest.length > 0 && (
        <Gallery>
          {rest.map((asset) => (
            <Shot key={asset.url} asset={asset} onOpen={setOpenAsset} />
          ))}
        </Gallery>
      )}

      <Section>
        <h2>{sections[3].title}</h2>
        <p>{sections[3].body}</p>
      </Section>

      <Section>
        <h2>Highlights</h2>
        <Highlights>
          {project.technicalHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Highlights>
      </Section>

      <NextLink to={`/work/${nextProject.id}`}>
        <span>
          <span className="eyebrow">Next project · {nextProject.id}</span>
          <span className="name">{nextProject.title}</span>
        </span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </NextLink>

      <ImageModal asset={openAsset} onClose={() => setOpenAsset(null)} />
    </Article>
  );
};

const INK = "#111110";
const MUTED = "#5F5E5A";
const LINE = "#E2E0DA";

const Article = styled.article`
  align-self: flex-start;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 4rem 4rem 6rem;
  box-sizing: border-box;
  color: ${INK};
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media (max-width: 992px) {
    padding: 2rem 1.5rem 3rem;
    gap: 2.75rem;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9375rem;

  > span {
    color: ${MUTED};
    font-variant-numeric: tabular-nums;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 44px;
  color: ${INK};
  text-decoration: none;

  svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform 0.2s ease;
  }

  @media (hover: hover) {
    &:hover svg {
      transform: translateX(-4px);
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 4.5rem;
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.035em;

  &:focus {
    outline: none;
  }

  @media (max-width: 992px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  margin: 0.625rem 0 0;
  font-size: 1.75rem;
  line-height: 1.25;
  letter-spacing: -0.015em;
  color: ${MUTED};
  text-wrap: balance;

  @media (max-width: 992px) {
    font-size: 1.375rem;
  }
`;

const Lede = styled.p`
  margin: 1.5rem 0 0;
  max-width: 680px;
  font-size: 1.25rem;
  line-height: 1.6;
  text-wrap: pretty;

  @media (max-width: 992px) {
    font-size: 1.0625rem;
  }
`;

const Facts = styled.dl`
  margin: 2rem 0 0;
  padding-top: 1.5rem;
  border-top: 1px solid ${LINE};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  dt {
    font-size: 0.8125rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: ${MUTED};
  }

  dd {
    margin: 0;
    font-size: 1rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1rem;
  }
`;

const Links = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  margin-top: 1rem;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 44px;
    font-size: 0.9375rem;
    color: ${INK};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }
`;

const Figure = styled.figure`
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  figcaption {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${MUTED};
  }
`;

const ShotButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  border: 1px solid ${LINE};
  border-radius: 10px;
  overflow: hidden;
  background: #eeece7;
  cursor: zoom-in;

  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:focus-visible {
    outline: 2px solid ${INK};
    outline-offset: 3px;
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem 1rem;

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

const Section = styled.section`
  display: grid;
  grid-template-columns: 200px minmax(0, 1fr);
  gap: 2.5rem;

  h2 {
    margin: 0;
    font-size: 1.0625rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.7;
    text-wrap: pretty;
  }

  @media (max-width: 992px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.625rem;

    p {
      font-size: 1.0625rem;
    }
  }
`;

const Highlights = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${LINE};

  li {
    padding: 1rem 0;
    border-bottom: 1px solid ${LINE};
    font-size: 1.0625rem;
    line-height: 1.55;
  }
`;

const NextLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  margin: 2rem -1rem 0;
  padding: 2rem 1rem;
  border-top: 1px solid ${LINE};
  border-bottom: 1px solid ${LINE};
  border-radius: 4px;
  color: ${INK};
  text-decoration: none;
  transition: background 0.2s ease;

  > span {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }

  .eyebrow {
    font-size: 0.875rem;
    color: ${MUTED};
  }

  .name {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  svg {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.4;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform 0.2s ease;
  }

  @media (hover: hover) {
    &:hover {
      background: #f0eee9;
    }
    &:hover svg {
      transform: translateX(4px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${INK};
    outline-offset: -2px;
  }

  @media (max-width: 992px) {
    margin: 1rem 0 0;
    padding: 1.5rem 0;

    .name {
      font-size: 2rem;
    }
  }
`;

export default ProjectCaseStudy;
