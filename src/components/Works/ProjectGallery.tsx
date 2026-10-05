import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Asset } from "../../types/project";
import { OptimizedImage } from "./OptimizedImage";

interface ProjectGalleryProps {
  assets: Asset[];
  label: string;
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ assets, label }) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const frameRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);

  const getSlides = () =>
    trackRef.current
      ? (Array.from(trackRef.current.children) as HTMLElement[])
      : [];

  const getPadding = () =>
    trackRef.current
      ? parseFloat(getComputedStyle(trackRef.current).paddingLeft) || 0
      : 0;

  const updateIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const padding = getPadding();
    let closest = 0;
    let smallest = Number.POSITIVE_INFINITY;
    getSlides().forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - padding - track.scrollLeft);
      if (distance < smallest) {
        smallest = distance;
        closest = i;
      }
    });
    setIndex(closest);
  }, []);

  const handleScroll = useCallback(() => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;
      updateIndex();
    });
  }, [updateIndex]);

  useEffect(
    () => () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    },
    []
  );

  const goTo = (next: number) => {
    const track = trackRef.current;
    const slide = getSlides()[next];
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - getPadding(),
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  };

  const total = assets.length;

  return (
    <Wrapper
      role="group"
      aria-roledescription="carousel"
      aria-label={`${label} screenshots`}
    >
      <Track
        ref={trackRef}
        onScroll={handleScroll}
        tabIndex={0}
        aria-label={`${label} screenshots, scrollable`}
      >
        {assets.map((asset, i) => (
          <Slide
            key={`${asset.url}-${i}`}
            style={
              asset.width && asset.height
                ? { aspectRatio: `${asset.width} / ${asset.height}` }
                : undefined
            }
          >
            {asset.type === "video" ? (
              <video autoPlay muted loop playsInline src={asset.url} />
            ) : (
              <OptimizedImage
                src={asset.url}
                alt={asset.alt ?? `${label} screenshot ${i + 1}`}
                width={asset.width}
                height={asset.height}
                fit="contain"
                loading={i === 0 ? "eager" : "lazy"}
              />
            )}
          </Slide>
        ))}
      </Track>

      {total > 1 && (
        <Controls>
          <Counter aria-hidden="true">
            {index + 1} / {total}
          </Counter>
          <Arrows>
            <ArrowButton
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous screenshot"
            >
              ←
            </ArrowButton>
            <ArrowButton
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === total - 1}
              aria-label="Next screenshot"
            >
              →
            </ArrowButton>
          </Arrows>
        </Controls>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Track = styled.ul`
  list-style: none;
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1rem;
  scroll-padding: 0 1rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  overscroll-behavior-x: contain;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Slide = styled.li`
  position: relative;
  flex: 0 0 min(86%, 520px);
  scroll-snap-align: start;
  overflow: hidden;
  background: #f8f7f4;

  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem 0;
`;

const Counter = styled.span`
  font-size: 0.8125rem;
  letter-spacing: 0.08em;
  color: rgba(0, 0, 0, 0.66);
  font-variant-numeric: tabular-nums;
`;

const Arrows = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ArrowButton = styled.button`
  width: 44px;
  height: 44px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  font-size: 1.1rem;
  transition: background-color 0.2s ease, color 0.2s ease;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: #000;
      color: #f8f7f4;
    }
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export default ProjectGallery;
