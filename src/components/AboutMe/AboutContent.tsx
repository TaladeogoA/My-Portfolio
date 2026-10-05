import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import Resume from "../../assets/Taladeogo-Abraham-Resume.pdf";
import taladeAudio from "../../assets/talade.m4a";
import taladeogoAudio from "../../assets/taladeogo.m4a";
import { Button } from "../Common/Button";
import { H1, Text } from "../Common/Typography";
import { MetaTags } from "../SEO/MetaTags";
import PictureAnimation from "./PictureAnimation";

let audioInstance: HTMLAudioElement | null = null;

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

  const handleResumeClick = () => {
    window.open(Resume, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <MetaTags
        title="About | Talade"
        description="Learn how Taladeogo approaches product engineering: translating complex, real-world workflows into clear and reliable web and mobile products."
      />
      <Container>
        <PictureContainer>
          <PictureAnimation />
          <Button
            onClick={handleResumeClick}
            aria-label="Open resume in new tab"
          >
            View Resume
          </Button>
        </PictureContainer>

        <AboutText>
          <H1>Product Engineer</H1>

          <Text $margin="0 0 1.5rem">
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
          </Text>

          <Lead>Product sense with an engineer's hands.</Lead>

          <Text $margin="0 0 1.25rem">
            I trained as a quantity surveyor before moving into frontend development.
            That background is probably why I care so much about the gap between a plan
            and what actually gets built.
          </Text>

          <Text $margin="0 0 1.25rem">
            Now I work on products where the hard part is out of sight. At <strong>Trivalue</strong>, I built PineLeap's frontend from scratch, a platform
            that turns conversations into goals, actions and meetings. At <strong>Compre</strong>, I work across the mobile app, web and backend services
            that connect pharmacies with distributors. Before that, at <strong>Famasi Africa</strong>, I built and shipped features across several
            healthcare products.
          </Text>

          <Text $margin="0 0 1.25rem">
            The part I like most is the space between a decision and the screen that
            carries it out: whether a flow makes sense, what someone sees when something
            goes wrong, how an interaction feels. I like being in that space.
          </Text>

          <Text $margin="0 0 1.25rem">
            Outside of work I play with <strong>Three.js</strong>, <strong>WebGL</strong> and animation. I like making things you can move around in, and I'm planning
            to study Human-Computer Interaction to understand why some of them feel good
            and others don't.
          </Text>

          <NextSteps>
            <Link to="/contact">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </NextSteps>
        </AboutText>
      </Container>
    </>
  );
};

export default AboutContent;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: clamp(2rem, 5vw, 5rem);
  min-height: 100vh;
  min-height: 100dvh;
  padding: clamp(1.5rem, 3vw, 3rem);

  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const PictureContainer = styled.div`
  position: sticky;
  top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: min(35%, 400px);

  @media screen and (max-width: 992px) {
    position: static;
    width: min(100%, 300px);
    margin-bottom: 1rem;
    gap: 1rem;

    > div:first-child {
      transform: scale(0.8);
      margin: -2rem 0;
    }
  }
`;

const AboutText = styled.article`
  width: min(65%, 720px);
  padding-bottom: 3rem;

  @media screen and (max-width: 992px) {
    width: 100%;
    padding-bottom: 2rem;
  }

  h1 {
    margin-bottom: 1.25rem;
  }
`;

const Lead = styled.p`
  margin: 0 0 1rem;
  font-size: clamp(1.4rem, 2.2vw, 1.75rem);
  font-weight: 500;
  line-height: 1.35;
  letter-spacing: -0.02em;
  text-wrap: balance;
`;

const NextSteps = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 2rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #000;

  a {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    min-height: 44px;
    color: #000;
    font-size: 1.0625rem;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;

    span {
      transition: transform 0.2s ease;
    }

    &:hover,
    &:focus-visible {
      border-bottom-color: #000;
    }

    @media (hover: hover) {
      &:hover span {
        transform: translateX(0.25rem);
      }
    }
  }
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
  color: #000;

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
  border-radius: 4px;
  font: inherit;
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

  @media (max-width: 768px) {
    padding: 0.2rem 0.4rem;
  }
`;

const Highlight = styled.span`
  color: #000;
  font-weight: 600;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
`;
