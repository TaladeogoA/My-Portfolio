import { useState } from "react";
import styled from "styled-components";
import Taladeogo from "../../assets/talade-about.jpg";
import { OptimizedImage } from "../Works/OptimizedImage";

const PictureAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);
  const text = "Taladeogo - Front-end developer - UI Designer - Illustrator -";
  const textWithSpans = text.split("").map((char, i) => (
    <span
      key={i}
      style={{
        transform: `rotate(${i * 5.8}deg)`,
      }}
    >
      {char}
    </span>
  ));

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`circle ${isHovered ? "hovered" : ""}`}>
        <ImageContainer>
          <OptimizedImage src={Taladeogo} alt="Taladeogo Abraham" />
        </ImageContainer>
        <p className="text">{textWithSpans}</p>
      </div>
    </Container>
  );
};

const ImageContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 240px;
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
    width: 300px;
    height: 300px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: rotateText 45s linear infinite;

      @keyframes rotateText {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }

      span {
        position: absolute;
        left: 50%;
        font-size: 1.2rem;
        transform-origin: 0 150px;
      }
    }

    &.hovered .text {
      animation-play-state: paused;
    }
  }
`;

export default PictureAnimation;
