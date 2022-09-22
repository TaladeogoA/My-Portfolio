import React from "react";
import styled from "styled-components";
// import "../index.css";
import Talade from "../../assets/Talade.png";
import TaladeWaving from "../../assets/Talade-waving.png";

function Logo({ background, hoverBackground }) {
  return (
    <Logo
      background={background}
      hoverBackground={hoverBackground}
      className="logo"
    ></Logo>
  );
}

const HomeContent = () => {
  const logos = [
    {
      url: Talade,
      hoverUrl: TaladeWaving,
    },
  ];

  return (
    <HomeContainer className="container">
      <HomeText>
        <h1>
          I'm <br /> talade.
        </h1>
        <p>(Taladeogo if you're feeling brave.)</p>
        <h2>
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

  h1 {
    text-transform: uppercase;
    font-size: 5rem;
    font-weight: 400;
  }

  p {
    font-family: "Mate", serif;
    font-size: 1.2rem;
    font-weight: 400;
    margin-top: 1rem;
  }

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
