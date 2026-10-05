import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import SplitType from "split-type";
import styled from "styled-components";
import FloatingTalade from "../../assets/talade-floating.webp";
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
  font-family: "Kodchasan", sans-serif;
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
    text-align: center;
    max-width: 100%;
  }
`;

const Heading = styled.h1`
  font-weight: 400;
`;

const Line = styled.span`
  display: block;
  text-transform: uppercase;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 400;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  line-height: 1.1;

  @media (max-width: 767px) {
    font-size: 3rem;
  }
`;

const Pronunciation = styled.p`
  margin-top: 0.5rem;
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  font-weight: 400;
`;

const Tagline = styled.h2`
  margin-top: clamp(1rem, 2vw, 1.5rem);
  max-width: 28em;
  font-size: clamp(1.0625rem, 1.5vw, 1.375rem);
  font-weight: 400;
  line-height: 1.4;
  text-wrap: balance;

  @media (max-width: 767px) {
    margin-inline: auto;
  }
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
