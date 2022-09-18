import React from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import WorkDetails from "./WorkDetails";
import { Link } from "react-router-dom";
import projects from "../../projectdata";
import styled from "styled-components";

const Works = () => {
  const works = gsap.timeline();

  return (
    <div>
      <PageTransition timeline={works} />
      <div className="works-overlay"></div>
      <div className="container">
        <ul>
          {projects.map((singleProject) => {
            return (
              <Wrapper key={singleProject.id} to={`/works/${singleProject.id}`}>
                <ListItem>
                  <h2>{singleProject.title}</h2>
                  <p>{singleProject.desc}</p>
                  <span className="tags-wrapper">{singleProject.tags}</span>
                </ListItem>
              </Wrapper>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Works;

const Wrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  text-align: left;
`;

const ListItem = styled.li`
  h2 {
    width: fit-content;
  }

  &::after {
    content: "";
    display: block;
    width: 100%;
    transform: scale(0);
    height: 1px;
    background-color: black;
    transform-origin: bottom left;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scale(1);
    transform-origin: bottom left;
  }
`;
