import React from "react";
import styled from "styled-components";
// Icons
import autocad from "../../assets/icons/autocad.png";
import behance from "../../assets/icons/behance.png";
import corel from "../../assets/icons/coreldraw.png";
import css from "../../assets/icons/css.png";
import figma from "../../assets/icons/figma.png";
import git from "../../assets/icons/git.png";
import github from "../../assets/icons/github.png";
import greensock from "../../assets/icons/greensock.png";
import html from "../../assets/icons/html.png";
import javascript from "../../assets/icons/javascript.png";
import react from "../../assets/icons/react.png";
import styledcomponents from "../../assets/icons/styled-components.png";
import tailwind from "../../assets/icons/tailwind.png";
import zeplin from "../../assets/icons/zeplin.png";
import PictureAnimation from "./PictureAnimation";

const AboutContent = () => {
  return (
    <Container className="container">
      <PictureAnimation />
      <AboutText>
        <p>
          Heyyy, My name is Taladeogo, but everybody calls me Talade. You can
          too.
        </p>
        <p>
          I'm a frontend dev with a passion for crafting captivating web
          experiences. I'm also a UI designer and illustrator with a knack for a
          clean and minimal aesthetic.
        </p>

        <p>
          I specialize in creating seamless user interfaces that not only look
          fantastic but also make navigating the digital landscape a breeze.
        </p>

        <p>
          Let's build something remarkable together, where every click and
          scroll feels like a magic trick ✨.
        </p>
      </AboutText>
    </Container>
  );
};

export default AboutContent;

const Container = styled.div`
  font-family: "Mate", serif;
  display: flex;
  gap: 3rem;
`;

const AboutText = styled.article`
  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;
