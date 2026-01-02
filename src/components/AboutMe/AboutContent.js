import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Resume from "../../assets/Taladeogo-Abraham-Resume.pdf";
import { Button } from "../Common/Button";
import { H2, Text } from "../Common/Typography";
import { MetaTags } from "../SEO/MetaTags";
import PictureAnimation from "./PictureAnimation";

const AboutContent = () => {
  const navigate = useNavigate();

  const handleResumeClick = () => {
    window.open(Resume, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <MetaTags
        title="About | Talade"
        description="Product engineer building production web and mobile applications with a focus on performance, reliability, and real-world constraints."
      />
      <Container>
        <PictureContainer>
          <PictureAnimation />
          <Button
            onClick={handleResumeClick}
            aria-label="Open resume in new tab"
          >
            View Resume
          </Button>
        </PictureContainer>

        <AboutText>
          <IntroSection>
            <H2>Product Engineer</H2>

            <Text $margin="0 0 1rem">
              My name is <Highlight>Taládéògo</Highlight>. Most people call me{" "}
              <Highlight>Talade</Highlight>.
            </Text>

            <Text $margin="0 0 1rem">
              I’m a product engineer working across web and mobile. I care about performance, reliability, and building things that don’t fall apart in production.
            </Text>

            <Text $margin="0 0 1rem">
              I currently work at  <strong>Famasi Africa</strong> as the sole mobile engineer. I ship and maintain consumer apps, internal tools, and pharmacy software used daily in real operating conditions, including poor connectivity and low-end devices.
            </Text>

            <Text $margin="0 0 1rem">
            Most of my work sits at the intersection of product and engineering. I take designs and messy requirements, turn them into maintainable systems, and see them through to App Store and Play Store releases.
            </Text>

            <Text $margin="0 0 1rem">
           Some things I've worked on recently:
            </Text>

            <ServicesList>
              <ServiceItem>
                <Text>
                Shipping multiple production mobile apps end to end
                </Text>
              </ServiceItem>

              <ServiceItem>
                <Text>
                Rebuilding an existing app with a new design and handling its first store release
                </Text>
              </ServiceItem>

              <ServiceItem>
                <Text>
Offline-first patterns, background sync, and resilient state
                </Text>
              </ServiceItem>

              <ServiceItem>
                <Text>
Real-time and AI-assisted features using LiveKit, WebSockets, and push notifications
                </Text>
              </ServiceItem>

              <ServiceItem>
                <Text>
Multi-tenant and white-label storefronts
                </Text>
              </ServiceItem>
            </ServicesList>

            <CTASection>
              <Text $margin="0 0 2rem">
               I like working on products that have real users, real constraints, and real consequences when things break.
              </Text>
              <Button
                variant="primary"
                onClick={() => navigate("/contact")}
                $padding="1rem 2rem"
              >
                Get in touch
              </Button>
            </CTASection>
          </IntroSection>
        </AboutText>
      </Container>
    </>
  );
};

export default AboutContent;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: clamp(2rem, 5vw, 5rem);
  min-height: 100vh;
  padding: clamp(1.5rem, 3vw, 3rem);
  overflow: hidden;

  @media screen and (max-width: 992px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;

const PictureContainer = styled.div`
  position: sticky;
  top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: min(35%, 400px);

  @media screen and (max-width: 992px) {
    position: static;
    width: min(100%, 300px);
    margin-bottom: 1rem;
    gap: 1rem;

    > div:first-child {
      transform: scale(0.8);
      margin: -2rem 0;
    }
  }
`;

const AboutText = styled.article`
  width: min(65%, 800px);
  height: calc(100vh - clamp(3rem, 6vw, 6rem));
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-right: clamp(1rem, 2vw, 2rem);

  @media screen and (max-width: 992px) {
    width: 100%;
    height: auto;
    overflow-y: visible;
    padding-right: 0;
    padding-bottom: 5rem;
  }

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: #F8F7F4;
  }

  ::-webkit-scrollbar-thumb {
    background: #c7c5c5;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a7a7;
  }
`;

const IntroSection = styled.section``;

const Highlight = styled.span`
  color: black;
  font-weight: 600;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: black;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const ServicesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 3rem;
`;

const ServiceItem = styled.li`
  line-height: 1.6;
  padding-left: 2rem;
  position: relative;
  margin-bottom: 1rem;
  font-size: clamp(1rem, 1.2vw, 1.2rem);

  &:before {
    content: "→";
    position: absolute;
    left: 0;
    color: black;
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;
