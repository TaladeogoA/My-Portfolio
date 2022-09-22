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

const AboutContent = () => {
  return (
    <Container className="container">
      <AboutText>
        <p>
          {" "}
          &ensp; I discovered my love for building while attempting to work in
          the construction industry; I knew I liked designing beautiful things
          and being a part of the building process.
        </p>

        <p>
          &ensp; It wasn't until recently that I realized I could channel this
          passion into designing and developing intuitive and visually appealing
          user interfaces for web applications. I've been doing it ever since.
        </p>

        <p>
          &ensp; When I'm not coding, I'm probably scrolling through Twitter,
          binge-watching a period drama I just learned about, or daydreaming
          about trips around the world (that I can't afford).
        </p>
      </AboutText>

      <AboutSkills>
        <div>
          <p>design</p>
          <ul>
            <li>
              <img src={figma} alt="figma" />
              <span>Figma</span>
            </li>
            <li>
              <img src={corel} alt="corel" />
              <span>CorelDraw</span>
            </li>
            <li>
              <img src={zeplin} alt="zeplin" />
              <span>Zeplin</span>
            </li>
            <li>
              <img src={behance} alt="behance" />
              <span>Behance</span>
            </li>
            <li>
              <img src={autocad} alt="autocad" />
              <span>AutoCAD</span>
            </li>
          </ul>
        </div>
        <div>
          <p>&</p>
        </div>
        <div>
          <p>development</p>
          <ul>
            <li>
              <img src={html} alt="html" />
              <span>HTML</span>
            </li>
            <li>
              <img src={css} alt="css" />
              <span>CSS</span>
            </li>
            <li>
              <img src={javascript} alt="javascript" />
              <span>Javascript</span>
            </li>
            <li>
              <img src={react} alt="react" />
              <span>React</span>
            </li>

            <li>
              <img src={greensock} alt="gsap" />
              <span>GSAP</span>
            </li>
            <li>
              <img src={git} alt="git" />
              <span>Git</span>
            </li>
            <li>
              <img src={github} alt="github" />
              <span>GitHub</span>
            </li>
            <li>
              <img src={styledcomponents} alt="styled-components" />
              <span>
                Styled
                <br />
                Components
              </span>
            </li>
            <li>
              <img src={tailwind} alt="tailwind" />
              <span>Tailwind</span>
            </li>
          </ul>
        </div>
      </AboutSkills>
    </Container>
  );
};

export default AboutContent;

const Container = styled.div`
  font-family: "Mate", serif;
`;

const AboutText = styled.article`
  h1 {
    font-size: 2rem;
    font-family: "Italiana", serif;
    margin-bottom: 1rem;
    color: #28282b;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    line-height: 1.5;
  }
`;

const AboutSkills = styled.article`
  display: flex;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  margin-top: 2rem;

  div {
    /* width: max-content; */

    p {
      font-size: 4rem;
      color: #808080;
      font-family: "Italiana", serif;
      font-weight: bold;
      margin-bottom: 1rem;
      display: inline-block;
      transition: all 0.3s ease-in-out;
      cursor: default;
    }

    ul {
      list-style: none;
      font-size: 1.2rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1.2rem;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          max-width: max-content;
        }
      }
    }

    &:hover p {
      color: #000;
    }
  }
`;
