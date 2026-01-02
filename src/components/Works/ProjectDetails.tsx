import { AnimatePresence, motion } from "framer-motion";
import React, { memo, useState } from "react";
import { FaAndroid, FaApple, FaGlobe } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import styled from "styled-components";
import { Asset, ProjectDetailsProps } from "../../types/project";
import { H1, H2, Text } from "../Common/Typography";
import { OptimizedImage } from "./OptimizedImage";

const ProjectDetails: React.FC<ProjectDetailsProps> = memo(
  ({ project, isMobileExpanded }) => {
    const [showFullDetails, setShowFullDetails] = useState(false);
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

    const AssetSlide = ({ asset }: { asset: Asset }) => {
      if (asset.type === "video") {
        return (
          <VideoWrapper>
            <video autoPlay muted loop playsInline src={asset.url} />
          </VideoWrapper>
        );
      }

      return (
        <ImageSlide>
          <OptimizedImage
            src={asset.url}
            alt="Project view"
            fit="contain"
          />
        </ImageSlide>
      );
    };

    const ImageCarousel = () => (
      <CarouselWrapper>
        <Slider {...carouselSettings}>
          {project.assets.map((asset, index) => (
            <AssetSlide key={index} asset={asset} />
          ))}
        </Slider>
      </CarouselWrapper>
    );

    const topHighlights = project.technicalHighlights.slice(0, 3);
    const remainingHighlights = project.technicalHighlights.slice(3);

    const AvailabilityRow = () => (
      <AvailabilityContainer>
        {project.live && (
          <IconLink
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Website"
            title="Visit Website"
          >
            <FaGlobe size={18} />
          </IconLink>
        )}
        {project.appStoreUrl && (
          <IconLink
            href={project.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on App Store"
            title="View on App Store"
          >
            <FaApple size={20} />
          </IconLink>
        )}
        {project.playStoreUrl && (
          <IconLink
            href={project.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on Play Store"
            title="View on Play Store"
          >
            <FaAndroid size={20} />
          </IconLink>
        )}
      </AvailabilityContainer>
    );

    if (isMobileExpanded) {
      return (
        <MobileExpandedContent>
          <ImageCarousel />

          <ContentSection>
            <Section>
              <Text>{project.shortDescription}</Text>
            </Section>

            <AvailabilityRow />

            <AnimatePresence>
              {showFullDetails && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Section>
                    <SectionTitle>The Challenge</SectionTitle>
                    <Text>{project.description}</Text>
                  </Section>

                  <Section>
                    <SectionTitle>My Role</SectionTitle>
                    <Text>{project.contribution}</Text>
                  </Section>

                  <Section>
                    <SectionTitle>Technical Highlights</SectionTitle>
                    <HighlightsList>
                      {project.technicalHighlights.map((highlight, index) => (
                        <li key={index}>
                          <Text>{highlight}</Text>
                        </li>
                      ))}
                    </HighlightsList>
                  </Section>
                </motion.div>
              )}
            </AnimatePresence>

            <ExpandButton onClick={() => setShowFullDetails(!showFullDetails)}>
              <Text>
                {showFullDetails ? "Show Less ↑" : "Read Full Case Study ↓"}
              </Text>
            </ExpandButton>
          </ContentSection>
        </MobileExpandedContent>
      );
    }

    return (
      <Container>
        <Content>
          {isMobile && <ImageCarousel />}

          <ContentSection>
            <H1>{project.subtitle}</H1>

            <Section>
              <Text>{project.shortDescription}</Text>
            </Section>

            <AvailabilityRow />

            <Section>
              <SectionTitle>Key Contributions</SectionTitle>
              <HighlightsList>
                {topHighlights.map((highlight, index) => (
                  <li key={index}>
                    <Text>{highlight}</Text>
                  </li>
                ))}
              </HighlightsList>

              <AnimatePresence>
                {showFullDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    {remainingHighlights.length > 0 && (
                      <HighlightsList>
                        {remainingHighlights.map((highlight, index) => (
                          <li key={index}>
                            <Text>{highlight}</Text>
                          </li>
                        ))}
                      </HighlightsList>
                    )}

                    <Section>
                      <SectionTitle>The Challenge</SectionTitle>
                      <Text>{project.description}</Text>
                    </Section>

                    <Section>
                      <SectionTitle>My Approach</SectionTitle>
                      <Text>{project.contribution}</Text>
                    </Section>
                  </motion.div>
                )}
              </AnimatePresence>

              <ExpandButton onClick={() => setShowFullDetails(!showFullDetails)}>
                <Text>
                  {showFullDetails
                    ? "Show Less ↑"
                    : `Read Full Case Study ${
                        remainingHighlights.length > 0
                          ? `(+${remainingHighlights.length} more highlights)`
                          : ""
                      } ↓`}
                </Text>
              </ExpandButton>
            </Section>
          </ContentSection>
        </Content>
      </Container>
    );
  }
);

const CarouselWrapper = styled.div`
  .slick-slider {
    margin-bottom: 2.5rem;
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
  width: 100%;
  max-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MobileExpandedContent = styled.div`
  padding-bottom: 2rem;
`;

const VideoWrapper = styled.div`
  padding: 0 0.5rem;

  video {
    width: 100%;
    height: 40vh;
    object-fit: cover;
  }
`;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: #f8f7f4;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1200px) {
    height: calc(100vh - 60px);
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

const Content = styled(motion.div)`
  padding: 2.5rem;
  height: 100%;

  @media (max-width: 1200px) {
    padding: 0;
  }
`;

const ContentSection = styled.div`
  padding: 0 1.5rem;
  max-width: 640px;

  @media (max-width: 768px) {
    padding: 0 1rem;
    max-width: 100%;
  }
`;

const Section = styled.div`
  margin: 2.5rem 0;

  &:last-child {
    padding-bottom: 2rem;
  }

  ${Text} {
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.8);
  }
`;

const SectionTitle = styled(H2)`
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  opacity: 0.6;
`;

const HighlightsList = styled.ul`
  padding-left: 1.25rem;
  margin: 0;

  li {
    margin-bottom: 0.875rem;
    line-height: 1.6;

    &::marker {
      color: rgba(0, 0, 0, 0.3);
    }

    ${Text} {
      display: inline;
    }
  }
`;

const AvailabilityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin: 1rem 0 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  @media (max-width: 768px) {
    gap: 1.5rem;
    margin: 1.5rem 0;
  }
`;

const IconLink = styled.a`
  color: black;
  opacity: 0.4;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 1;
    transform: translateY(-1px);
  }
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.75rem 0;
  margin-top: 1.5rem;
  display: block;

  ${Text} {
    font-size: 0.875rem;
    text-decoration: underline;
    text-underline-offset: 3px;
    opacity: 0.6;
    transition: opacity 0.2s ease;
  }

  &:hover ${Text} {
    opacity: 1;
  }
`;

export default ProjectDetails;