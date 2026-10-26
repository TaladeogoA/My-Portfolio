import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import SplitType from "split-type";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FloatingTalade from "../../assets/talade-floating.webp";
import {
  ArrowIcon,
  INK,
  MUTED,
  PillLink,
  quietLinkStyles,
} from "../Common/theme";
import { MetaTags } from "../SEO/MetaTags";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useLayoutEffect(() => {
    const img = imageRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
    }
  }, []);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const splits: SplitType[] = [];

    const ctx = gsap.context(() => {
      if (reduceMotion) {
        gsap.set(".reveal", { opacity: 1 });
        return;
      }

      gsap.set(".reveal", { opacity: 0 });
      const tl = gsap.timeline();

      [lineOneRef.current, lineTwoRef.current].forEach((line, index) => {
        if (!line) return;
        const split = new SplitType(line, {
          types: ["chars", "words"],
        });
        splits.push(split);
        tl.fromTo(
          split.chars ?? [],
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.04,
            ease: "power4.out",
          },
          index * 0.35
        );
      });

      tl.to(".reveal", { opacity: 1, duration: 0.5, ease: "power1.out" }, 0.5);
    }, container);

    return () => {
      ctx.revert();
      splits.forEach((split) => split.revert());
    };
  }, []);

  return (
    <>
      <MetaTags
        title="Talade | Product Engineer"
        description="Product engineer making complex workflows feel simple across web and mobile."
      />
      <MainContainer ref={containerRef}>
        <ContentContainer>
          <HomeText>
            <Heading aria-label="Hi, I'm Talade.">
              <Line ref={lineOneRef}>Hi, I'm</Line>
              <Line ref={lineTwoRef}>Talade.</Line>
            </Heading>
            <Pronunciation className="reveal">
              (Taládéògo if you're feeling brave.)
            </Pronunciation>

            <Tagline className="reveal">
              Product engineer making complex workflows feel simple, across web
              and mobile.
            </Tagline>

            <Now className="reveal">
              <span className="dot" aria-hidden="true" />
              Currently building PineLeap at Trivalue
            </Now>

            <Actions className="reveal">
              <PillLink to="/work">
                See my work
                <ArrowIcon />
              </PillLink>
              <QuietLink to="/about">About me</QuietLink>
            </Actions>
          </HomeText>

          <HomeImgContainer>
            <HomeImg
              ref={imageRef}
              src={FloatingTalade}
              alt="Illustration of Talade floating"
              width={800}
              height={879}
              {...{ fetchpriority: "high" }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              $loaded={imageLoaded}
            />
            <ShadowOverlay $loaded={imageLoaded} aria-hidden="true" />
          </HomeImgContainer>
        </ContentContainer>
      </MainContainer>
    </>
  );
};

export default Home;

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  overflow: hidden;
  color: ${INK};
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(90%, 1400px);
  margin: 0 auto;
  min-height: 100vh;
  min-height: 100dvh;
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(1rem, 3vw, 3rem);

  @media (max-width: 992px) {
    gap: 3rem;
  }

  @media (max-width: 767px) {
    flex-direction: column-reverse;
    justify-content: center;
    padding-bottom: max(7rem, 15vh);
    gap: 2rem;
  }
`;

const HomeText = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const Heading = styled.h1`
  margin: 0;
  font-weight: 600;
`;

const Line = styled.span`
  display: block;
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  line-height: 1.05;
`;

const Pronunciation = styled.p`
  margin: 0.75rem 0 0;
  font-size: 1.0625rem;
  color: ${MUTED};
`;

const Tagline = styled.p`
  margin: 1.75rem 0 0;
  max-width: 24em;
  font-size: clamp(1.1875rem, 1.8vw, 1.5rem);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.01em;
  text-wrap: balance;
`;

const Now = styled.p`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  margin: 1.5rem 0 0;
  font-size: 0.9375rem;
  color: ${MUTED};

  .dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2f7d4a;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 2rem;
  margin-top: 2rem;
`;

const QuietLink = styled(Link)`
  ${quietLinkStyles}
`;

const HomeImgContainer = styled.div`
  position: relative;
  width: min(35%, 400px);
  aspect-ratio: 1;

  @media (max-width: 767px) {
    width: min(80%, 300px);
  }
`;

const HomeImg = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: auto;
  will-change: transform;
  animation: float 6s ease-in-out infinite both;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 1s ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(clamp(-15px, -2vw, -20px));
    }
  }
`;

const ShadowOverlay = styled.div<{ $loaded: boolean }>`
  width: 80%;
  margin-inline: auto;
  height: clamp(1rem, 1.5vw, 1.5rem);
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 1s ease-in-out;
  animation: shadowGrowAndShrink 6s ease-in-out infinite both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @keyframes shadowGrowAndShrink {
    0%,
    100% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(clamp(1.5, 2vw, 2));
    }
  }
`;
