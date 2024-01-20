import React, { useState } from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { data } from "../../data/projectdata";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Works = () => {
  const works = gsap.timeline();
  const [hoveredColor, setHoveredColor] = useState("#fff");
  const handleMouseEnter = (color) => {
    setHoveredColor(color);
  };

  const handleMouseLeave = () => {
    setHoveredColor("#fff");
  };

  return (
    <>
      <PageTransition timeline={works} />
      <div className="works-overlay"></div>
      <Main className="container">
        <div className="splide">
          <Splide
            tag="section"
            options={{
              rewind: true,
              perPage: 2.5,
              perMove: 1,
              gap: ".5rem",
              pagination: false,
              breakpoints: {
                768: {
                  perPage: 2,
                },
                480: {
                  perPage: 1,
                },
              },
            }}
          >
            {data.map((project) => {
              return (
                <SplideSlide key={project.id}>
                  <ProjectCard
                    hoveredColor={hoveredColor}
                    onMouseEnter={() => handleMouseEnter(project.hoverColor)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="image">
                      <img src={project.img} alt={project.title} />
                    </div>

                    <p>{project.title}</p>
                  </ProjectCard>
                </SplideSlide>
              );
            })}
          </Splide>
        </div>
      </Main>
    </>
  );
};

export default Works;

const Main = styled.main`
  max-width: 70vw;
  margin: auto;
  margin-left: -4rem;

  ::-webkit-scrollbar {
    height: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background: #c7c5c5;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a7a7;
  }
`;

const ProjectCard = styled.div`
  flex: 0 0 auto;
  width: 300px;
  height: 300px;
  margin-bottom: 2rem;

  .image {
    border: 1px solid blue;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0); /* Initial box-shadow is transparent */
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 0 30px ${(props) => props.hoveredColor};
      scale: 1.02;
    }
  }

  p {
    font-size: 1rem;
    margin-top: 0.5rem;
    font-family: "Mate", serif;
    font-weight: 600;
  }

  &:hover {
    cursor: pointer;
    /* transform: scale(1.05);
    transition: transform 0.2s ease-in-out; */
  }
`;
