import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import Resume from "../../assets/Taladeogo-Abraham-Resume.pdf";
import taladeAudio from "../../assets/talade.m4a";
import taladeogoAudio from "../../assets/taladeogo.m4a";
import { Button } from "../Common/Button";
import { H2, Text } from "../Common/Typography";
import { MetaTags } from "../SEO/MetaTags";
import PictureAnimation from "./PictureAnimation";

let audioInstance = null;

const AboutContent = () => {
  const [activeAudio, setActiveAudio] = useState(null);

  const playAudio = (audioFile, id) => {
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.currentTime = 0;
    }

    setActiveAudio(id);
    audioInstance = new Audio(audioFile);
    audioInstance
      .play()
      .then(() => {
        audioInstance.onended = () => setActiveAudio(null);
      })
      .catch(() => {
        setActiveAudio(null);
      });
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
          <IntroSection>
            <H2>Product Engineer</H2>

            <Text $margin="0 0 1rem">
              My name is{" "}
              <NameContainer
                onClick={() => playAudio(taladeogoAudio, "taladeogo")}
                role="button"
                aria-label="Listen to pronunciation of Taládéògo"
                $isPlaying={activeAudio === "taladeogo"}
              >
                <Highlight>Taládéògo</Highlight>
                <SpeakerIcon $isPlaying={activeAudio === "taladeogo"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.5v-3m4.5 5.25v-7.5m4.5 11.25v-15m4.5 11.25v-7.5m4.5 5.25v-3"
                    />
                  </svg>
                </SpeakerIcon>
              </NameContainer>
              . Most people call me{" "}
              <NameContainer
                onClick={() => playAudio(taladeAudio, "talade")}
                role="button"
                aria-label="Listen to pronunciation of Talade"
                $isPlaying={activeAudio === "talade"}
              >
                <Highlight>Talade</Highlight>
                <SpeakerIcon $isPlaying={activeAudio === "talade"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.5v-3m4.5 5.25v-7.5m4.5 11.25v-15m4.5 11.25v-7.5m4.5 5.25v-3"
                    />
                  </svg>
                </SpeakerIcon>
              </NameContainer>
              .
            </Text>
            <Text $margin="0 0 1rem">
              I'm a product engineer who likes figuring out how things should
              work, then building them. Most of my work has been on products
              with a lot going on behind the scenes, from pharmaceutical
              marketplaces and pharmacy software to SaaS products and internal
              tools.
            </Text>

            <Text $margin="0 0 1rem">
              At <strong>Compre</strong>, I work across the mobile app, web
              applications and backend services that connect pharmacies with
              pharmaceutical distributors. At <strong>Famasi Africa</strong>, I
              built and shipped features across several healthcare products,
              including mobile apps, pharmacy tools and consumer experiences.
            </Text>

            <Text $margin="0 0 1rem">
              I enjoy the part of engineering where product decisions and
              implementation meet. I care about whether a flow makes sense, what
              happens when an error occurs, how an interaction feels, and all
              the little details that are easy to overlook.
            </Text>

            <Text $margin="0 0 1rem">
              Outside of product work, I'm usually experimenting with{" "}
              <strong>Three.js</strong>, <strong>WebGL</strong> and animation. I
              like the more visual side of the web too, especially when
              technology can be used to create something people can actually
              interact with.
            </Text>
          </IntroSection>
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
  padding: clamp(1.5rem, 3vw, 3rem);
  overflow: hidden;

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
  width: min(65%, 800px);
  height: calc(100vh - clamp(3rem, 6vw, 6rem));
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-right: clamp(1rem, 2vw, 2rem);

  @media screen and (max-width: 992px) {
    width: 100%;
    height: auto;
    overflow-y: visible;
    padding-right: 0;
    padding-bottom: 5rem;
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #f8f7f4;
  }

  ::-webkit-scrollbar-thumb {
    background: #c7c5c5;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a7a7;
  }
`;

const IntroSection = styled.section``;

const NameContainer = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
  padding: 0 0.2rem;
  margin: 0 -0.2rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      background-color: rgba(0, 0, 0, 0.08);
    `}

  @media (max-width: 768px) {
    /* Larger touch target on mobile */
    padding: 0.2rem 0.4rem;
  }
`;

const speakerPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const SpeakerIcon = styled.span`
  background: none;
  border: none;
  padding: 0;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;

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

  &:hover svg,
  &:active svg {
    transform: scale(1.15) rotate(-5deg);
  }

  &:active svg {
    transform: scale(0.9) rotate(0deg);
  }

  &::after {
    content: attr(aria-label);
    position: absolute;
    bottom: 120%;
    left: 50%;
    transform: translateX(-50%) translateY(5px);
    background: black;
    color: white;
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: all 0.2s ease;
    pointer-events: none;
    font-family: inherit;
    z-index: 10;
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0);
  }
`;

const Highlight = styled.span`
  color: black;
  font-weight: 600;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: black;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;
