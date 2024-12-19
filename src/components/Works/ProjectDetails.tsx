import { motion } from "framer-motion";
import React, { memo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import { ProjectDetailsProps } from "../../../types/project";
import { H1, H2, Text } from "../Common/Typography";

const ProjectDetails: React.FC<ProjectDetailsProps> = memo(
  ({ project, isMobileExpanded }) => {
    const isMobile = window.innerWidth < 1200;

    const carouselSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: isMobile ? 1 : 2,
      slidesToScroll: 1,
      arrows: !isMobile,
      autoplay: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            arrows: false,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
          },
        },
      ],
    };

    const ImageCarousel = () => (
      <CarouselWrapper>
        <Slider {...carouselSettings}>
          {project.images.map((image, index) => (
            <ImageSlide key={index}>
              <img src={image} alt={`${project.title} view ${index + 1}`} />
            </ImageSlide>
          ))}
        </Slider>
      </CarouselWrapper>
    );

    if (isMobileExpanded) {
      return (
        <MobileExpandedContent>
          <ImageCarousel />

          <ContentSection>
            <Links>
              {project.live && (
                <LinkButton
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>Visit Online</Text>
                </LinkButton>
              )}
              {project.source && (
                <LinkButton
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>Source Code</Text>
                </LinkButton>
              )}
            </Links>

            <Section>
              <H2>Problem</H2>
              <Text>{project.problem}</Text>
            </Section>

            <Section>
              <H2>Solution</H2>
              <Text>{project.solution}</Text>
            </Section>

            <Section>
              <H2>Technical Highlights</H2>
              <HighlightsList>
                {project.technicalHighlights.map((highlight, index) => (
                  <li key={index}>
                    <Text>{highlight}</Text>
                  </li>
                ))}
              </HighlightsList>
            </Section>
          </ContentSection>
        </MobileExpandedContent>
      );
    }

    return (
      <Container>
        <Content>
          {isMobile && <ImageCarousel />}

          <ContentSection>
            <H1>{project.title}</H1>

            <Links>
              {project.live && (
                <LinkButton
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>Visit Online</Text>
                </LinkButton>
              )}
              {project.source && (
                <LinkButton
                  href={project.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>Source Code</Text>
                </LinkButton>
              )}
            </Links>

            <Section>
              <H2>Problem</H2>
              <Text>{project.problem}</Text>
            </Section>

            <Section>
              <H2>Solution</H2>
              <Text>{project.solution}</Text>
            </Section>

            <Section>
              <H2>Technical Highlights</H2>
              <HighlightsList>
                {project.technicalHighlights.map((highlight, index) => (
                  <li key={index}>
                    <Text>{highlight}</Text>
                  </li>
                ))}
              </HighlightsList>
            </Section>
          </ContentSection>
        </Content>
      </Container>
    );
  }
);

const CarouselWrapper = styled.div`
  .slick-slider {
    margin-bottom: 2rem;
  }

  .slick-dots {
    bottom: -25px;
  }

  .slick-prev,
  .slick-next {
    z-index: 1;
    &:before {
      color: black;
    }
  }

  .slick-prev {
    left: 10px;
  }

  .slick-next {
    right: 10px;
  }

  @media (max-width: 768px) {
    margin: 0 -1rem;
  }
`;

const ImageSlide = styled.div`
  padding: 0 0.5rem;

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

const MobileExpandedContent = styled.div`
  padding: 1rem;

  img {
    width: 100%;
    height: 40vh;
    object-fit: cover;
    margin-bottom: 2rem;
  }
`;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: #fff;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    height: calc(100vh - 60px);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const Content = styled(motion.div)`
  padding: 2rem;
  height: 100%;

  @media (max-width: 1200px) {
    padding: 0;
  }
`;

const ContentSection = styled.div`
  padding: 0 1rem;
`;

const Section = styled.div`
  margin: 2.5rem 0;
`;

const HighlightsList = styled.ul`
  padding-left: 1rem;
`;

const Links = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 1.5rem 0;
`;

const LinkButton = styled.a`
  color: black;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  transition: all 0.3s ease;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
  }
`;

export default ProjectDetails;
