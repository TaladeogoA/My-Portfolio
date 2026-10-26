import React, { useLayoutEffect, useRef, useState } from "react";
import { FaAndroid, FaApple, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useScrollChoreography } from "../../hooks/useScrollChoreography";
import { Asset, Project } from "../../types/project";
import { ArrowIcon, HOVER, INK, LINE, MUTED, PAPER } from "../Common/theme";
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

/**
 * Every screenshot sits on the same cream plate, centred and scaled to fit,
 * so projects with very different artwork still read as one set.
 */
const Shot: React.FC<{
  asset: Asset;
  number: number;
  eager?: boolean;
  onOpen: (asset: Asset) => void;
}> = ({ asset, number, eager, onOpen }) => {
  const ratio = asset.width && asset.height ? asset.width / asset.height : 16 / 10;
  const caption = asset.caption ?? asset.alt;
  return (
    <Figure>
      <Plate
        type="button"
        data-clip
        data-parallax={eager ? "" : undefined}
        onClick={() => onOpen(asset)}
        $hero={!!eager}
        $bare={!!asset.bare}
      >
        <Frame $bare={!!asset.bare} style={{ "--ratio": ratio } as React.CSSProperties}>
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
        </Frame>
        <VisuallyHidden>Enlarge image</VisuallyHidden>
      </Plate>
      {caption && (
        <figcaption>
          <span className="num">{pad(number)}</span>
          <span>{caption}</span>
        </figcaption>
      )}
    </Figure>
  );
};

const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({
  project,
  index,
  total,
  nextProject,
}) => {
  const [openAsset, setOpenAsset] = useState<Asset | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const articleRef = useRef<HTMLElement>(null);

  // PageLayout only resets scroll between top-level pages, so moving
  // from the list or between projects has to do it here. It must run before
  // the scroll animations are set up: built while still scrolled to the
  // bottom of the last project, they fire mid-setup and GSAP crashes.
  useLayoutEffect(() => {
    document.getElementById("main-content")?.scrollTo({ top: 0, left: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [project.id]);
  useScrollChoreography(articleRef, project.id);

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
    <Article ref={articleRef}>
      <TopRow>
        <BackLink to="/work">
          <ArrowIcon direction="left" />
          All work
        </BackLink>
        <span>
          {pad(index + 1)} / {pad(total)}
        </span>
      </TopRow>

      <header>
        <Title
          ref={headingRef}
          tabIndex={-1}
          aria-label={project.title}
          data-split
        >
          {project.title}
        </Title>
        <Subtitle data-fade>{project.subtitle}</Subtitle>
        <Lede data-fade>{project.shortDescription}</Lede>

        <Facts data-stagger>
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
          <Links data-fade>
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

      {hero && <Shot asset={hero} number={1} eager onOpen={setOpenAsset} />}

      {sections.slice(0, 3).map((section) => (
        <Section key={section.title} data-fade>
          <h2>{section.title}</h2>
          <p>{section.body}</p>
        </Section>
      ))}

      {rest.length > 0 && (
        <Gallery>
          {rest.map((asset, i) => (
            <Shot key={asset.url} asset={asset} number={i + 2} onOpen={setOpenAsset} />
          ))}
        </Gallery>
      )}

      <Section data-fade>
        <h2>{sections[3].title}</h2>
        <p>{sections[3].body}</p>
      </Section>

      <Section>
        <h2>Highlights</h2>
        <Highlights data-stagger>
          {project.technicalHighlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </Highlights>
      </Section>

      <NextLink to={`/work/${nextProject.id}`} data-fade>
        <span>
          <span className="eyebrow">Next project · {nextProject.id}</span>
          <span className="name" data-split>
            {nextProject.title}
          </span>
        </span>
        <ArrowIcon />
      </NextLink>

      <ImageModal asset={openAsset} onClose={() => setOpenAsset(null)} />
    </Article>
  );
};

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
  gap: 0.625rem;
  min-height: 44px;
  color: ${INK};
  text-decoration: none;
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
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${MUTED};

    .num {
      color: ${INK};
      font-variant-numeric: tabular-nums;
    }
  }
`;

const PLATE = "#ECE9E2";

// A fixed-ratio plate; the image is scaled to fit inside it, whatever its shape.
const Plate = styled.button<{ $hero: boolean; $bare: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: ${({ $hero }) => ($hero ? "16 / 9" : "3 / 2")};
  box-sizing: border-box;
  padding: ${({ $hero, $bare }) =>
    $bare ? "0" : $hero ? "clamp(1rem, 5%, 3.5rem)" : "clamp(0.875rem, 6%, 2.25rem)"};
  border: 0;
  border-radius: 8px;
  overflow: hidden;
  background: ${PLATE};
  cursor: zoom-in;
  container-type: size;

  &:focus-visible {
    outline: 2px solid ${INK};
    outline-offset: 3px;
  }
`;

// Sized to the image's own ratio, as large as the plate allows. A bare image
// already carries the plate colour and its own shadows, so it gets no frame.
const Frame = styled.div<{ $bare: boolean }>`
  width: min(100cqw, calc(100cqh * var(--ratio)));
  aspect-ratio: var(--ratio);
  border-radius: ${({ $bare }) => ($bare ? "0" : "4px")};
  overflow: hidden;
  background: ${({ $bare }) => ($bare ? PLATE : PAPER)};
  box-shadow: ${({ $bare }) =>
    $bare
      ? "none"
      : "0 1px 2px rgba(17, 17, 16, 0.06), 0 14px 32px -14px rgba(17, 17, 16, 0.22)"};
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);

  ${Plate}:hover & {
    transform: translateY(-3px);
  }

  > *,
  video {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// Two per row; an odd one out at the end takes the full width.
const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2.5rem 1rem;

  > :last-child:nth-child(odd) {
    grid-column: 1 / -1;

    ${Plate} {
      aspect-ratio: 16 / 9;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 2rem;
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

  /* The label stays in view while its section scrolls past. */
  @media (min-width: 993px) {
    h2 {
      position: sticky;
      top: 2rem;
      align-self: start;
    }
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

  > span:first-child {
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

  /* The arrow, sized by font-size. */
  > span:last-child {
    font-size: 30px;
  }

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
    margin: 1rem 0 0;
    padding: 1.5rem 0;

    .name {
      font-size: 2rem;
    }
  }
`;

export default ProjectCaseStudy;
