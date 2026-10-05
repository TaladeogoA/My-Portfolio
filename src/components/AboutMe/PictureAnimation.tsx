import { useState } from "react";
import styled from "styled-components";
import Taladeogo from "../../assets/talade-about.webp";
import { OptimizedImage } from "../Works/OptimizedImage";

const RING_TEXT = "Taladeogo • Product Engineer • Thoughtful Technology •";
const SIZE = 340;
const RADIUS = 142;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const PictureAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`circle ${isHovered ? "hovered" : ""}`}>
        <ImageContainer>
          <OptimizedImage
            src={Taladeogo}
            alt="Taladeogo Abraham"
            width={720}
            height={720}
            loading="eager"
          />
        </ImageContainer>
        <svg
          className="ring"
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <path
              id="ring-path"
              d={`M ${SIZE / 2},${SIZE / 2} m -${RADIUS},0 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
            />
          </defs>
          <text>
            <textPath
              href="#ring-path"
              textLength={CIRCUMFERENCE - 2}
              lengthAdjust="spacing"
            >
              {RING_TEXT}
            </textPath>
          </text>
        </svg>
      </div>
    </Container>
  );
};

const ImageContainer = styled.div`
  position: absolute;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 1;
`;

const Container = styled.div`
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  .circle {
    position: relative;
    width: ${SIZE}px;
    height: ${SIZE}px;
    max-width: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .ring {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      animation: rotateText 60s linear infinite;
      fill: #000;
      font-size: 17px;
      letter-spacing: 0;

      @keyframes rotateText {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    }

    &.hovered .ring {
      animation-play-state: paused;
    }
  }
`;

export default PictureAnimation;
