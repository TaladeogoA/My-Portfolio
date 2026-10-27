import gsap from "gsap";
import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import SplitType from "split-type";
import styled from "styled-components";
import FloatingTalade from "../../assets/talade-floating.webp";
import {
  INK,
  MUTED,
  PAPER,
  PillLink,
} from "../Common/theme";
import { MetaTags } from "../SEO/MetaTags";
import { useMediaQuery } from "../../hooks/useMediaQuery";

// Home starts fetching the particle code as soon as it mounts, so the code is
// usually ready by the time the image has loaded.
const loadParticleFigure = () => import("../Effects/ParticleFigure");
const ParticleFigure = lazy(loadParticleFigure);

// How long the figure can stay empty after Home opens. If the particles aren't
// drawing by then, the photo stands in until they are.
const PARTICLE_WAIT_MS = 2000;

// No test WebGL context here: creating and destroying one right before the
// particles create theirs left the figure blank on a first visit in Chrome on
// Android. ParticleFigure reports a missing or broken context through onError.
const canUseParticles = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return "WebGLRenderingContext" in window;
};

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineOneRef = useRef<HTMLSpanElement>(null);
  const lineTwoRef = useRef<HTMLSpanElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [particles] = useState(canUseParticles);
  const [particlesReady, setParticlesReady] = useState(false);
  const [particlesFailed, setParticlesFailed] = useState(false);
  const [box, setBox] = useState({ width: 0, height: 0 });
  const isPhone = useMediaQuery("(max-width: 767px)");

  // The particle canvas lines up with the image, so track its rendered size.
  useEffect(() => {
    const img = imageRef.current;
    if (!img || !particles) return;
    const measure = () => {
      const width = Math.round(img.clientWidth);
      const height = Math.round(img.clientHeight);
      setBox((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(img);
    return () => observer.disconnect();
  }, [particles]);

  useEffect(() => {
    if (particles) loadParticleFigure().catch(() => setParticlesFailed(true));
  }, [particles]);

  // The particles always take over. The photo stays hidden while they start so
  // it doesn't show first, but only briefly: if they aren't drawing within
  // PARTICLE_WAIT_MS of Home opening (a cold load on a phone usually still has
  // three.js downloading), the photo stands in until they are, then hands over.
  // The timer doesn't wait for the photo's load event, so a missed event can't
  // leave the figure empty.
  const [particlesSlow, setParticlesSlow] = useState(false);
  useEffect(() => {
    if (!particles || particlesReady) return;
    const timer = window.setTimeout(() => setParticlesSlow(true), PARTICLE_WAIT_MS);
    return () => window.clearTimeout(timer);
  }, [particles, particlesReady]);
  const showParticles =
    particles && !particlesFailed && (imageLoaded || particlesSlow) && box.width > 0;
  const hidePhoto = particles && !particlesFailed && (particlesReady || !particlesSlow);

  // A cached image can finish loading before React sees it, so check directly too.
  useLayoutEffect(() => {
    const img = imageRef.current;
    if (!img) return;
    if (img.complete && img.naturalWidth > 0) {
      setImageLoaded(true);
      return;
    }
    let cancelled = false;
    img
      .decode()
      .catch(() => {})
      .then(() => {
        if (!cancelled) setImageLoaded(true);
      });
    return () => {
      cancelled = true;
    };
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
              (Taládéògo if you're brave.)
            </Pronunciation>

            <Tagline className="reveal">
              Product engineer making complex workflows feel simple, across web
              and mobile.
            </Tagline>

            <Actions className="reveal">
              <PillLink to="/work">
                See my work
              </PillLink>
            </Actions>
          </HomeText>

          <HomeImgContainer>
            <HomeImg
              ref={imageRef}
              src={FloatingTalade}
              alt="Talade sitting cross-legged in a meditation pose"
              width={800}
              height={881}
              {...{ fetchpriority: "high" }}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              $loaded={imageLoaded || particlesSlow}
              $hidden={hidePhoto}
            />
            {showParticles && (
              <Suspense fallback={null}>
                <ParticleFigure
                  src={FloatingTalade}
                  boxWidth={box.width}
                  boxHeight={box.height}
                  mono
                  bleed={isPhone ? 0.08 : 0.35}
                  maxPointsSmall={13000}
                  pointScale={1}
                  onReady={() => setParticlesReady(true)}
                  onError={() => setParticlesFailed(true)}
                />
              </Suspense>
            )}
            <ShadowOverlay $loaded={imageLoaded} aria-hidden="true" />
          </HomeImgContainer>
        </ContentContainer>
      </MainContainer>
    </>
  );
};

export default Home;

const SHORT_PHONE = "@media (max-width: 767px) and (max-height: 720px)";

const MainContainer = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  overflow: hidden;
  color: ${INK};
  position: relative;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: min(90%, 1400px);
  margin: 0 auto;
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(1rem, 3vw, 3rem);

  @media (max-width: 992px) {
    gap: 3rem;
  }

  /* Phones: a poster. The particle portrait fills the screen behind
     everything, and the text sits over its lap at the bottom, centred to
     match the symmetrical pose. HomeText uses display: contents so its
     children can be ordered and layered over the figure. */
  @media (max-width: 767px) {
    position: relative;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-end;
    width: 100%;
    box-sizing: border-box;
    padding: 1rem 1.5rem 1.5rem;
    gap: 0;
    text-align: center;
  }
`;

const HomeText = styled.div`
  flex: 1;
  max-width: 600px;

  @media (max-width: 767px) {
    display: contents;

    > * {
      position: relative;
      z-index: 1;
    }
  }
`;

const Heading = styled.h1`
  margin: 0;
  font-weight: 600;

  @media (max-width: 767px) {
    order: 2;
    position: relative;
    z-index: 1;
    margin-top: 0;
  }
`;

const Line = styled.span`
  display: block;
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  line-height: 1.05;

  @media (max-width: 767px) {
    &:first-child {
      font-size: 1.375rem;
      font-weight: 500;
      letter-spacing: -0.01em;
      line-height: 1.3;
    }
    &:last-child {
      font-size: min(24vw, 7.5rem);
      letter-spacing: -0.055em;
      line-height: 0.92;
      padding-bottom: 0.06em;

      /* Split letters lose kerning, so pull the full stop back to the e. */
      .char:last-child {
        margin-left: -0.05em;
      }
    }
  }

  ${SHORT_PHONE} {
    &:last-child {
      font-size: min(20vw, 6rem);
    }
  }
`;

const Pronunciation = styled.p`
  margin: 0.25rem 0 0;
  font-size: 1.0625rem;
  color: ${MUTED};

  @media (max-width: 767px) {
    order: 3;
    margin-top: 0;
    font-size: 0.9375rem;
  }
`;

const Tagline = styled.p`
  margin: 1.75rem 0 0;
  max-width: 24em;
  font-size: clamp(1.1875rem, 1.8vw, 1.5rem);
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: -0.01em;
  text-wrap: balance;

  @media (max-width: 767px) {
    order: 4;
    margin: 1rem auto 0;
    max-width: 21em;
    font-size: 1.125rem;
  }

  ${SHORT_PHONE} {
    margin-top: 0.75rem;
    font-size: 1.0625rem;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem 2rem;
  margin-top: 2rem;

  @media (max-width: 767px) {
    order: 5;
    flex-wrap: nowrap;
    justify-content: center;
    margin-top: 1.25rem;
  }

  ${SHORT_PHONE} {
    margin-top: 1rem;
  }
`;

const HomeImgContainer = styled.div`
  position: relative;
  width: min(35%, 400px);
  aspect-ratio: 1;

  /* On phones the figure is a full-bleed backdrop, cropped by the screen
     edges, with a cream fade over its lap so the text reads on top. */
  @media (max-width: 767px) {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 0;
    width: min(140vw, 68dvh);
    aspect-ratio: 800 / 881;
    transform: translateX(-50%);

    &::after {
      content: "";
      position: absolute;
      left: -20%;
      right: -20%;
      bottom: -12%;
      height: 50%;
      pointer-events: none;
      background: linear-gradient(
        to bottom,
        rgba(248, 247, 244, 0) 0%,
        rgba(248, 247, 244, 0.75) 45%,
        ${PAPER} 80%
      );
    }
  }
`;

const HomeImg = styled.img<{ $loaded: boolean; $hidden: boolean }>`
  display: block;
  width: 100%;
  height: auto;
  will-change: transform;
  animation: float 6s ease-in-out infinite both;
  filter: grayscale(1) contrast(1.05);
  opacity: ${({ $loaded, $hidden }) => ($loaded && !$hidden ? 1 : 0)};
  transition: opacity ${({ $hidden }) => ($hidden ? "0.6s" : "1s")} ease-in-out;

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

  @media (max-width: 767px) {
    display: none;
  }

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
