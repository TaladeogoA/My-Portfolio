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
        description="Learn about my journey in software development, skills, and experience building innovative web and mobile solutions."
      />
      <Container>
        <PictureContainer>
          <PictureAnimation />
          <Button
            onClick={handleResumeClick}
            aria-label="Open resume in new tab"
          >
            View my Resume
          </Button>
        </PictureContainer>

        <AboutText>
          <IntroSection>
            <H2>Heyyy, </H2>
            <Text $margin="0 0 1rem">
              My name is <Highlight>Táládeogó</Highlight>, but everybody calls
              me <Highlight>Talade</Highlight>. You can too.
            </Text>

            <Text $margin="0 0 1rem">
              I'm a cross-platform developer creating seamless digital
              experiences across web and mobile. With a background in
              construction and design, I bring a unique perspective to every
              project, blending form and function into intuitive, engaging
              interfaces.
            </Text>

            <Text $margin="0 0 1rem">
              Over the past few years, I've had the opportunity to work on
              diverse projects across healthcare, education, and enterprise
              sectors. Here are some highlights:
            </Text>

            <ServicesList>
              <ServiceItem>
                <Text>
                  3+ years developing frontend applications in health tech.
                </Text>
              </ServiceItem>
              <ServiceItem>
                <Text>
                  Led frontend development for Learning Management System at
                  Mobann Technologies.
                </Text>
              </ServiceItem>
              <ServiceItem>
                <Text>
                  Built React Native apps with 7k+ combined downloads for
                  OctoDoc.
                </Text>
              </ServiceItem>
              <ServiceItem>
                <Text>
                  Collaborated with international teams to deliver complex web
                  and mobile solutions.
                </Text>
              </ServiceItem>
            </ServicesList>

            <CTASection>
              <Text $margin="0 0 2rem">
                Have a project in mind? Let's create something amazing together.
              </Text>
              <Button
                variant="primary"
                onClick={() => navigate("/contact")}
                $padding="1rem 2rem"
              >
                Let's Talk
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

  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .skill-container {
    margin-bottom: 1rem;

    .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        font-size: 1rem;
        border: 1px solid #000;
        padding: 0.2rem 0.5rem;
        border-radius: 15px;
        margin-bottom: 5px;

        &.inverted {
          background-color: #000;
          color: #fff;
        }
      }
    }
  }

  ::-webkit-scrollbar {
    width: 7px;
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
