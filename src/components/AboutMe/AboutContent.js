import { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
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
    audioInstance.play()
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
        description="Product engineer building production web and mobile applications with a focus on performance, reliability, and real-world constraints."
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
                onClick={() => playAudio(taladeogoAudio, 'taladeogo')}
                role="button"
                aria-label="Listen to pronunciation of Taládéògo"
                $isPlaying={activeAudio === 'taladeogo'}
              >
                <Highlight>Taládéògo</Highlight>
                <SpeakerIcon $isPlaying={activeAudio === 'taladeogo'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5v-3m4.5 5.25v-7.5m4.5 11.25v-15m4.5 11.25v-7.5m4.5 5.25v-3" />
                  </svg>
                </SpeakerIcon>
              </NameContainer>
              . Most people call me{" "}
              <NameContainer
                onClick={() => playAudio(taladeAudio, 'talade')}
                role="button"
                aria-label="Listen to pronunciation of Talade"
                $isPlaying={activeAudio === 'talade'}
              >
                <Highlight>Talade</Highlight>
                <SpeakerIcon $isPlaying={activeAudio === 'talade'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.5v-3m4.5 5.25v-7.5m4.5 11.25v-15m4.5 11.25v-7.5m4.5 5.25v-3" />
                  </svg>
                </SpeakerIcon>
              </NameContainer>
              .
            </Text>
            <Text $margin="0 0 1rem">
              I'm a product engineer with 3+ years of experience building production web and mobile apps. I work mainly on the frontend using React and React Native, across web, iOS, and Android. I've handled store submissions, OTA updates, offline-first systems, and real-time features.
            </Text>

            <Text $margin="0 0 1rem">
              I currently work at <strong>Compre</strong> building B2B infrastructure for pharmacies. Before that, I was the mobile engineer at <strong>Famasi Africa</strong>, where I built and maintained the mobile apps used by customers and pharmacies. I worked alongside a small team of engineers on the broader platform, including consumer products, pharmacy tools, and internal dashboards used daily in low-connectivity environments on low-end devices.
            </Text>

            <Text $margin="0 0 1rem">
              Most of my work is taking unclear product ideas and turning them into stable systems. I've shipped across multiple platforms, built offline-resilient state management, integrated real-time and AI features, and supported white-label products without breaking existing clients.
            </Text>

            <Text $margin="0 0 1rem">
              Lately, I've been exploring <strong>Three.js</strong> and <strong>WebGL</strong> to get into more interactive and immersive web experiences.
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
    background: #F8F7F4;
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

  ${({ $isPlaying }) => $isPlaying && css`
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
    ${({ $isPlaying }) => $isPlaying && css`
      animation: ${speakerPulse} 0.5s ease-in-out infinite;
      color: #666;
    `}
  }

  &:hover svg, &:active svg {
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
