import gsap from "gsap";
import { useEffect, useRef } from "react";
import styled from "styled-components";
import FloatingTalade from "../../assets/talade-floating.png";
import { animateText } from "../../utils/Animation";
import { MetaTags } from "../SEO/MetaTags";

const Home = () => {
  const textRefs = useRef([]);
  const timeline = useRef(gsap.timeline());

  useEffect(() => {
    const textElements = textRefs.current;
    const tl = timeline.current;

    tl.clear();

    gsap.set(".new-text", { opacity: 0 });

    textElements.forEach((element) => {
      tl.add(animateText(element));
    });

    tl.to(
      ".new-text",
      {
        opacity: 1,
        duration: 0.7,
      },
      ">"
    );

    tl.play();
  }, []);

  return (
    <>
      <MetaTags
        title="Talade | Frontend Engineer"
        description="Frontend engineer crafting exceptional digital experiences with React, React Native, and modern web technologies."
      />
      <MainContainer>
        <BackgroundOverlay>
          <img
            src="./black-white-code.png"
            alt="html background"
            loading="lazy"
          />
        </BackgroundOverlay>

        <ContentContainer>
          <HomeText>
            <Block
              className="text-block"
              ref={(el) => (textRefs.current[0] = el)}
            >
              <Text className="h1">Hi, I'm</Text>
            </Block>

            <Block className="text-block">
              <Text className="h1" ref={(el) => (textRefs.current[1] = el)}>
                Talade.
              </Text>
              <Text className="p new-text">
                (Taládéògo if you're feeling brave.)
              </Text>
            </Block>

            <h2 className="new-text">
              Cross-platform developer, from web to mobile, and <br />{" "}
              everything in between.
            </h2>
          </HomeText>

          <HomeImgContainer>
            <HomeImg src={FloatingTalade} alt="Avatar version of me floating" />
            <ShadowOverlay />
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
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: min(90%, 1400px);
  margin: 0 auto;
  min-height: 100vh;
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

  h2 {
    font-size: clamp(1rem, 1.2vw, 1.2rem);
    margin-top: clamp(1rem, 2vw, 1.5rem);
    font-weight: 400;
    line-height: 1.4;
  }

  span {
    font-size: clamp(0.875rem, 1vw, 1rem);
  }

  @media (max-width: 767px) {
    text-align: center;
    max-width: 100%;
  }
`;

const Block = styled.div``;

const Text = styled.div`
  font-size: clamp(1rem, 1.2vw, 1.2rem);
  font-weight: 400;

  &.h1 {
    text-transform: uppercase;
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 400;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
    line-height: 1.1;
  }

  &.p {
    font-size: clamp(1rem, 1.2vw, 1.2rem);
    font-weight: 400;
    margin-top: 0.5rem;
  }

  @media (max-width: 767px) {
    &.h1 {
      font-size: 3rem;
    }

    &.p {
      font-size: 1rem;
    }
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

const HomeImg = styled.img`
  width: 100%;
  height: auto;
  will-change: transform;
  animation: float 6s ease-in-out infinite both;

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

const ShadowOverlay = styled.div`
  width: 80%;
  margin-inline: auto;
  height: clamp(1rem, 1.5vw, 1.5rem);
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.35) 0%,
    rgba(0, 0, 0, 0) 70%
  );
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

const BackgroundOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 10rem;
  opacity: 0.4;

  img {
    width: 80%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(1);
  }

  @media (max-width: 767px) {
    display: none;
  }
`;
