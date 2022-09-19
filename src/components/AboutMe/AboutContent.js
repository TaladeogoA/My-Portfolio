import React from "react";
import styled from "styled-components";

const AboutContent = () => {
  return (
    <Container className="container">
      <div>
        <TextWrapper>
          I enjoy the process of designing and developing user interfaces for
          web applications that are both intuitive and visually appealing.
        </TextWrapper>
        <TextWrapper>
          I stumbled into web development with Javascript and its frameworks and
          I discovered I could combine all the things I love. Over the past year
          I have built e-commerce sites, landing pages, a chrome extension and
          other interesting projects.
        </TextWrapper>
      </div>

      <div>
        <p>Here's some of the tools I've worked with:</p>
        <p>design & development</p>
        <ul>
          <li>Figma</li>
          <li>Corel Draw</li>
          <li>Zeplin</li>
          <li>Behance</li>
          <li>AutoCAD</li>
        </ul>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Styled Components</li>
          <li>GSAP</li>
          <li>Git</li>
          <li>Github</li>
          <li>Tailwind CSS</li>
        </ul>
      </div>
    </Container>
  );
};

export default AboutContent;

const Container = styled.div`
  font-family: "Mate", serif;
  display: flex;
  flex-direction: column;
`;

const TextWrapper = styled.article``;
