import React from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import { Link } from "react-router-dom";
import projects from "../../projectdata";
import styled from "styled-components";

const Works = () => {
  const works = gsap.timeline();

  return (
    <div>
      <PageTransition timeline={works} />
      <div className="works-overlay"></div>
      <Main className="container">
        <ListWrapper>
          {projects.map((singleProject) => {
            return (
              <Wrapper
                key={singleProject.id}
                to={`/works/${singleProject.id}`}
                onClick={() => {
                  // we want to save the data for the specific project into local storage whenever its clicked on
                  localStorage.setItem(
                    `project${singleProject?.id}`,
                    JSON.stringify(singleProject)
                  );
                }}
              >
                <ListItem>
                  <h2>
                    <sup>2022 / </sup>
                    {singleProject.title}
                  </h2>
                  <p>{singleProject.desc}</p>
                </ListItem>
              </Wrapper>
            );
          })}
        </ListWrapper>
      </Main>
    </div>
  );
};

export default Works;

const Main = styled.main`
  left: 45%;
`;

const Wrapper = styled(Link)`
  text-decoration: none;
  margin-right: -2rem;
  color: #000;

  p {
    color: #808080;
  }

  &:hover {
    p {
      color: #000;
    }

    h2 {
      font-weight: 500;
    }
  }
`;

const ListWrapper = styled.ul`
  position: relative;
  margin-right: -2.5rem;
`;

const ListItem = styled.li`
  text-align: right;

  h2 {
    width: fit-content;
    margin-left: auto;
    font-size: 2.5rem;
    font-weight: 300;
    font-family: "Mate", serif;

    sup {
      font-size: 1rem;
    }
  }

  &::after {
    content: "";
    display: block;
    width: 100%;
    transform: scale(0);
    height: 1px;
    background-color: black;
    transform-origin: bottom right;
    transition: transform 0.2s ease-out;
  }

  &:hover::after {
    transform: scale(1);
    transform-origin: bottom right;
  }
`;
