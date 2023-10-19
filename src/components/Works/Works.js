import React from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { data } from "../../data/projectdata";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Pagination from "../../utils/Pagination";

const Works = () => {
  const works = gsap.timeline();
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(4);

  useEffect(() => {
    const updateProjectsPerPage = () => {
      const screenHeight = window.innerHeight;
      if (screenHeight <= 500) {
        setProjectsPerPage(2);
      } else if (screenHeight <= 800) {
        setProjectsPerPage(3);
      } else if (screenHeight <= 1023) {
        setProjectsPerPage(4);
      } else {
        setProjectsPerPage(5);
      }
    };

    updateProjectsPerPage();
    window.addEventListener("resize", updateProjectsPerPage);

    return () => {
      window.removeEventListener("resize", updateProjectsPerPage);
    };
  }, []);

  // Get current projects
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = data.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <>
      <PageTransition timeline={works} />
      <div className="works-overlay"></div>
      <Main className="container">
        <ListWrapper>
          {currentProjects.map((singleProject) => {
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

        <Pagination
          projectsPerPage={projectsPerPage}
          totalProjects={data.length}
          paginate={(pageNumber) => setCurrentPage(pageNumber)}
          currentPage={currentPage}
        />
      </Main>
    </>
  );
};

export default Works;

const Main = styled.main`
  left: 45%;
  top: 55%;
  height: 60%;

  > div {
    position: absolute;
    bottom: -5rem;
    left: 0;
    right: 0;
  }
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
    font-size: 2rem;
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
    border-bottom: 1px solid #fff;
    margin-top: 1rem;
    transition: all 0.3s ease-in-out;
  }

  &:hover h2 {
    background-color: #000;
    color: white;
    transition: background-color 0.3s ease-out;
  }
`;
