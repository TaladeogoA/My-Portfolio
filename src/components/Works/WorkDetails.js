import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { BiArrowBack } from "react-icons/bi";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { Link } from "react-router-dom";

const WorkDetails = () => {
  const [projectData, setProjectData] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      const localData = localStorage.getItem(`project${projectId}`);
      setProjectData([JSON.parse(localData)]);
    }
    return () => {
      localStorage.removeItem(`project${projectId}`);
    };
  }, [projectId]);

  return (
    <Main className="container">
      {projectData.length > 0 &&
        projectData.map((data) => {
          return (
            <Wrapper key={data.id}>
              <div className="project-nav">
                <Link to="/works">
                  <BiArrowBack />
                  <span>Back to works</span>
                </Link>
              </div>

              <span className="quotes">
                <RiDoubleQuotesL />
              </span>
              {data.tagline && <h1>{data.tagline}</h1>}

              <span className="quotes">
                <RiDoubleQuotesR />
              </span>

              <div className="project-details">
                <div className="project-content">
                  <div className="title">
                    <p>Title</p>
                  </div>
                  <div>
                    <p>{data.title}</p>
                  </div>
                </div>
                <div className="project-content">
                  <div className="title">
                    <p>Tools</p>
                  </div>
                  <div>
                    <p>{data.tags}</p>
                  </div>
                </div>
                <div className="project-content">
                  <div className="title">
                    <p>Timeline</p>
                  </div>
                  <div>
                    <p>{data.timeline}</p>
                  </div>
                </div>
                <div className="project-content project-links">
                  <div className="title">
                    <p>Live Site</p>
                  </div>
                  <div>
                    <a target="_blank" rel="noreferrer" href={data.live}>
                      <span>View Live</span>
                    </a>
                  </div>
                </div>
                <div className="project-content project-links">
                  <div className="title">
                    <p>Source Code</p>
                  </div>
                  <div>
                    <a target="_blank" rel="noreferrer" href={data.source}>
                      <span>View Source</span>
                    </a>
                  </div>
                </div>
              </div>

              <Content>
                <div className="project-img">
                  {data.image && (
                    <img
                      src={require(`../../assets/${data.image}`)}
                      alt={data.title}
                    />
                  )}
                </div>
                <div className="project-desc">
                  <p>{data.details}</p>
                </div>
              </Content>
            </Wrapper>
          );
        })}
    </Main>
  );
};

export default WorkDetails;

const Main = styled.main`
  left: 45%;
`;

const Wrapper = styled.article`
  font-family: "Mate", serif;

  .project-nav {
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    margin-bottom: 3rem;
    transition: all 0.3s ease-in-out;

    a {
      color: #000;
      text-decoration: none;

      span {
        margin-left: 5px;
        vertical-align: top;
      }

      &:hover {
        text-decoration: underline;
      }
    }
  }

  h1 {
    font-size: 2rem;
    display: inline;
    font-family: "Italiana", serif;
  }

  .quotes {
    font-size: small;
    margin: 0 5px;
    vertical-align: super;
  }

  .project-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;

    :not(:last-child) {
      margin-bottom: 1rem;
      border-bottom: 1px solid #808080;
    }

    p {
      margin: 10px 0;
    }

    .title {
      width: 30%;
    }
  }

  .project-links {
    a {
      color: inherit;
      text-decoration: none;

      ::after {
        content: "";
        display: block;
        width: 100%;
        border-bottom: 1px solid black;
        transition: opacity 0.3s ease-in-out;
      }

      :hover::after {
        opacity: 0;
      }
    }
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;

  .project-img {
    img {
      width: 100%;
    }
  }

  .project-desc {
    span {
      font-weight: 300;
      font-family: "Mate", serif;
      font-size: 0.8rem;
    }

    h2 {
      margin-top: 5px;
      font-size: 2rem;
    }

    p {
      margin: 0.6rem 0;
      font-weight: 300;
      font-family: "Mate", serif;
      font-size: 1rem;
    }
  }
`;
