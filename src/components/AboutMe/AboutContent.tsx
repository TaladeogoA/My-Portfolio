import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import Portrait from "../../assets/talade-about.webp";
import Resume from "../../assets/Taladeogo-Abraham-Resume.pdf";
import taladeAudio from "../../assets/talade.m4a";
import taladeogoAudio from "../../assets/taladeogo.m4a";
import {
  ArrowIcon,
  INK,
  LINE,
  LinkIcon,
  MUTED,
  PillLink,
  quietLinkStyles,
} from "../Common/theme";
import { VisuallyHidden } from "../Common/VisuallyHidden";
import { MetaTags } from "../SEO/MetaTags";
import { OptimizedImage } from "../Works/OptimizedImage";

let audioInstance: HTMLAudioElement | null = null;

const EXPERIENCE = [
  {
    company: "Trivalue",
    role: "Built PineLeap's frontend from scratch",
    period: "2026 – now",
  },
  {
    company: "Compre",
    role: "Founding mobile engineer, across web and backend too",
    period: "2024 – now",
  },
  {
    company: "Famasi Africa",
    role: "Sole mobile engineer on Famasi and Dispensary",
    period: "2025 – 2026",
  },
  {
    company: "Octosoft",
    role: "Mobile engineer on Octodoc",
    period: "2023 – 2025",
  },
];

const SpeakerSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 13.5v-3m4.5 5.25v-7.5m4.5 11.25v-15m4.5 11.25v-7.5m4.5 5.25v-3"
    />
  </svg>
);

interface NameButtonProps {
  name: string;
  isPlaying: boolean;
  onPlay: () => void;
}

const NameButton = ({ name, isPlaying, onPlay }: NameButtonProps) => (
  <NameContainer
    type="button"
    onClick={onPlay}
    aria-label={`Hear how to pronounce ${name}`}
    data-tip="Hear it"
    $isPlaying={isPlaying}
  >
    <Highlight>{name}</Highlight>
    <SpeakerIcon $isPlaying={isPlaying}>
      <SpeakerSvg />
    </SpeakerIcon>
  </NameContainer>
);

const AboutContent = () => {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);

  const playAudio = (audioFile: string, id: string) => {
    audioInstance?.pause();

    const audio = new Audio(audioFile);
    audioInstance = audio;
    setActiveAudio(id);
    audio.onended = () => setActiveAudio(null);
    audio.play().catch(() => setActiveAudio(null));
  };

  useEffect(() => {
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance = null;
      }
    };
  }, []);

  return (
    <>
      <MetaTags
        title="About | Talade"
        description="Learn how Taladeogo approaches product engineering: translating complex, real-world workflows into clear and reliable web and mobile products."
      />
      <Article>
        <Header>
          <Photo>
            <OptimizedImage
              src={Portrait}
              alt="Taladeogo Abraham"
              width={720}
              height={720}
              loading="eager"
            />
          </Photo>
          <div>
            <Title>About</Title>
            <Lead>Product sense with an engineer's hands.</Lead>
          </div>
        </Header>

        <Section>
          <h2>Hello</h2>
          <Body>
            <p>
              My name is{" "}
              <NameButton
                name="Taládéògo"
                isPlaying={activeAudio === "taladeogo"}
                onPlay={() => playAudio(taladeogoAudio, "taladeogo")}
              />
              . Most people call me{" "}
              <NameButton
                name="Talade"
                isPlaying={activeAudio === "talade"}
                onPlay={() => playAudio(taladeAudio, "talade")}
              />
              .
            </p>
            <p>
              I trained as a quantity surveyor before moving into frontend
              development. That background is probably why I care so much about
              the gap between a plan and what actually gets built.
            </p>
            <p>
              The part I like most is the space between a decision and the
              screen that carries it out: whether a flow makes sense, what
              someone sees when something goes wrong, how an interaction feels.
            </p>
          </Body>
        </Section>

        <Section>
          <h2>Experience</h2>
          <div>
            <XpList>
              {EXPERIENCE.map((item) => (
                <li key={item.company}>
                  <span className="company">{item.company}</span>
                  <span className="role">{item.role}</span>
                  <span className="period">{item.period}</span>
                </li>
              ))}
            </XpList>
            <Aside>
              Each project has its own write-up on the{" "}
              <Link to="/work">Work page</Link>.
            </Aside>
          </div>
        </Section>

        <Section>
          <h2>Outside work</h2>
          <Body>
            <p>
              I play with Three.js, WebGL and animation. I like making things
              you can move around in, and I'm planning to study Human-Computer
              Interaction to understand why some of them feel good and others
              don't.
            </p>
          </Body>
        </Section>

        <Actions>
          <PillLink to="/contact">
            Get in touch
            <ArrowIcon />
          </PillLink>
          <ResumeLink href={Resume} target="_blank" rel="noopener noreferrer">
            Résumé (PDF)
            <LinkIcon />
            <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
          </ResumeLink>
        </Actions>
      </Article>
    </>
  );
};

export default AboutContent;

const Article = styled.article`
  align-self: flex-start;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
  padding: 6rem 4rem;
  box-sizing: border-box;
  color: ${INK};
  display: flex;
  flex-direction: column;
  gap: 4.5rem;

  @media (max-width: 992px) {
    padding: 3rem 1.5rem;
    gap: 3rem;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
`;

const Photo = styled.div`
  flex-shrink: 0;
  width: 168px;
  height: 168px;
  border-radius: 50%;
  overflow: hidden;

  @media (max-width: 600px) {
    width: 120px;
    height: 120px;
  }
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

const Lead = styled.p`
  margin: 0.875rem 0 0;
  font-size: 1.5rem;
  line-height: 1.35;
  letter-spacing: -0.01em;
  color: ${MUTED};
  text-wrap: balance;

  @media (max-width: 992px) {
    font-size: 1.25rem;
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

  @media (max-width: 992px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0.75rem;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  p {
    margin: 0;
    font-size: 1.125rem;
    line-height: 1.7;
    text-wrap: pretty;
  }

  @media (max-width: 992px) {
    p {
      font-size: 1.0625rem;
    }
  }
`;

const XpList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid ${LINE};

  li {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr) auto;
    gap: 0.5rem 1.5rem;
    align-items: baseline;
    padding: 1.125rem 0;
    border-bottom: 1px solid ${LINE};
  }

  .company {
    font-size: 1.125rem;
    font-weight: 600;
  }

  .role {
    font-size: 1rem;
    line-height: 1.5;
    color: ${MUTED};
  }

  .period {
    font-size: 0.875rem;
    color: ${MUTED};
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    li {
      grid-template-columns: minmax(0, 1fr) auto;
    }

    .role {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }
`;

const Aside = styled.p`
  margin: 1.25rem 0 0;
  font-size: 1rem;
  color: ${MUTED};

  a {
    color: ${INK};
    font-weight: 500;
    text-underline-offset: 4px;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${LINE};
`;

const ResumeLink = styled.a`
  ${quietLinkStyles}
`;

const speakerPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const SpeakerIcon = styled.span<{ $isPlaying: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${INK};

  svg {
    width: 1.1rem;
    height: 1.1rem;
    transition: transform 0.2s ease;
    ${({ $isPlaying }) =>
      $isPlaying &&
      css`
        animation: ${speakerPulse} 0.5s ease-in-out infinite;
        color: #666;
      `}
  }
`;

const NameContainer = styled.button<{ $isPlaying: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0 0.2rem;
  margin: 0 -0.2rem;
  border: 0;
  border-radius: 4px;
  font: inherit;
  color: inherit;
  letter-spacing: inherit;
  vertical-align: baseline;
  cursor: pointer;
  transition: background-color 0.2s ease;
  background-color: ${({ $isPlaying }) =>
    $isPlaying ? "rgba(0, 0, 0, 0.08)" : "transparent"};

  &::after {
    content: attr(data-tip);
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    background: #000;
    color: #f8f7f4;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    line-height: 1.2;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
    z-index: 10;
  }

  @media (hover: hover) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }

    &:hover::after {
      opacity: 1;
      visibility: visible;
      transform: translateX(-50%) translateY(0);
    }

    &:hover svg {
      transform: scale(1.15) rotate(-5deg);
    }
  }

  &:focus-visible::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

const Highlight = styled.span`
  color: ${INK};
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
`;
