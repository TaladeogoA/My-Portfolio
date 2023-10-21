import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Talade from "../../assets/Talade.png";
import TaladeWaving from "../../assets/Talade-waving.png";
import { animateText } from "../../utils/Animation";
import gsap from "gsap";

const HomeContent = () => {
  const logos = [
    {
      url: Talade,
      hoverUrl: TaladeWaving,
    },
  ];

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

      {logos.map((item, index) => {
        return (
          <Logos
            key={index}
            background={item.url}
            hoverBackground={item.hoverUrl}
          />
        );
      })}
    </HomeContainer>
  );
};

export default HomeContent;

const HomeContainer = styled.main`
  display: flex;
  gap: 3rem;
  align-items: flex-end;
  left: 55%;
`;

const HomeText = styled.div`
  width: 85%;

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

const Logos = styled.div`
  background: ${(props) => `url(${props.background})`};
  background-size: cover;
  width: 21rem;
  height: 26rem;
  transition: all 0.5s ease-in-out;

  &:hover {
    background: ${(props) => `url(${props.hoverBackground})`};
    background-size: cover;
    width: 21rem;
    height: 26rem;
  }
`;
