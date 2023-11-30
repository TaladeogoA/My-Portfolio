import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import FloatingTalade from "../../assets/talade-floating.png";
import { animateText } from "../../utils/Animation";
import gsap from "gsap";

const HomeContent = () => {
  const textRefs = useRef([]);
  const timeline = useRef(gsap.timeline());

  useEffect(() => {
    const textElements = textRefs.current;

    textElements.forEach((element) => {
      timeline.current.add(animateText(element));
    });
    timeline.current.from(".new-text", {
      autoAlpha: 0,
      duration: 0.7,
    });

    timeline.current.play();
  }, []);

  return (
    <HomeContainer className="container">
      <HomeText>
        <Block className="text-block" ref={(el) => (textRefs.current[0] = el)}>
          <Text className="h1">Hi, I'm</Text>
        </Block>

        <Block className="text-block">
          <Text className="h1" ref={(el) => (textRefs.current[1] = el)}>
            Talade.
          </Text>
          <Text className="p new-text">
            (Táládeogó if you're feeling brave.)
          </Text>
        </Block>

        <h2 className="new-text">
          Front-end developer, UI Designer and Illustrator
          <span> (sometimes).</span>
        </h2>
      </HomeText>

      <HomeImgContainer>
        <HomeImg src={FloatingTalade} alt="Avatar version of me floating" />
        <ShadowOverlay />
      </HomeImgContainer>
    </HomeContainer>
  );
};

export default HomeContent;

const HomeContainer = styled.main`
  display: flex;
  align-items: center;
  left: 55%;
  width: max-content;
  max-width: 70vw;
`;

const HomeText = styled.div`
  margin-left: 5rem;

  h2 {
    font-family: "Mate", serif;
    font-size: 1.2rem;
    margin-top: 1.5rem;
    font-weight: 400;
  }

  span {
    font-size: 1rem;
    font-family: "Indie Flower", cursive;
  }
`;

const Block = styled.div``;

const Text = styled.div`
  font-size: 1.2rem;
  font-weight: 400;

  &.h1 {
    text-transform: uppercase;
    font-size: 5rem;
    font-weight: 400;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
  }

  &.p {
    font-family: "Mate", serif;
    font-size: 1.2rem;
    font-weight: 400;
  }
`;

const HomeImgContainer = styled.div`
  position: relative;
  width: 50%;
`;

const HomeImg = styled.img`
  animation: float 6s ease-in-out infinite both;
  width: 100%;

  @keyframes float {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

const ShadowOverlay = styled.div`
  width: 80%;
  border-radius: 50%;
  margin-left: 10%;
  height: 1.5rem;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0) 70%
  );
  animation: shadowGrowAndShrink 6s ease-in-out infinite both;

  @keyframes shadowGrowAndShrink {
    0% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(2);
    }
    100% {
      transform: scaleY(1);
    }
  }
`;
