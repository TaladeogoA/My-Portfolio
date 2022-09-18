import React from "react";
import styled from "styled-components";
// import "../index.css";
import Talade from "../../assets/Talade.png";
import TaladeWaving from "../../assets/Talade-waving.png";
import FlowerOne from "../../assets/flower-one.png";
import FlowerTwo from "../../assets/flower-two.png";

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
      {/* <img className="flower-two" src={FlowerTwo} alt="" /> */}
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

const HomeContainer = styled.div`
  display: flex;
  gap: 3rem;
  align-items: flex-end;

  .flower-two {
    position: absolute;
    bottom: -20rem;
    left: -15rem;
  }
`;

const HomeText = styled.div`
  h1 {
    text-transform: uppercase;
    font-size: 5rem;
    font-weight: 400;
  }

  p {
    // font-family: "Indie Flower", cursive;
    font-family: "Mate", serif;
    font-size: 1.2rem;
    font-weight: 400;
  }

  h2 {
    font-family: "Mate", serif;
    font-size: 1.4rem;
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
