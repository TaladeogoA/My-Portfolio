import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Resume from "../../assets/Taladeogo-Abraham-Resume.pdf";
import { Button } from "../Common/Button";
import { H2, Text } from "../Common/Typography";
import PictureAnimation from "./PictureAnimation";

const AboutContent = () => {
  const navigate = useNavigate();
  const handleResumeClick = () => {
    window.open(Resume, "_blank", "noopener,noreferrer");
  };

  return (
    <Container>
      <PictureContainer>
        <PictureAnimation />
        <Button
          variant="secondary"
          onClick={handleResumeClick}
          aria-label="Open resume in new tab"
        >
          View my Resume
        </Button>
      </PictureContainer>

      <AboutText>
        <IntroSection>
          <H2>Heyyy, </H2>
          <LargeText $margin="0 0 1rem">
            My name is <Highlight>Táládeogó</Highlight>, but everybody calls me{" "}
            <Highlight>Talade</Highlight>. You can too.
          </LargeText>

          <Text $margin="0 0 2rem">
            I'm a cross-platform developer creating seamless digital experiences
            across web and mobile. With a background in construction and design,
            I bring a unique perspective to every project, blending form and
            function into intuitive, engaging interfaces.
          </Text>

          <Text $margin="0 0 2rem">
            Over the past few years, I've had the opportunity to work on diverse
            projects across healthcare, education, and enterprise sectors. Here
            are some highlights:
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
                Built React Native apps with 7k+ combined downloads for OctoDoc.
              </Text>
            </ServiceItem>
            <ServiceItem>
              <Text>
                Collaborated with international teams to deliver complex web and
                mobile solutions.
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
  );
};

export default AboutContent;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 5rem;
  height: 100vh;
  padding: 3rem;
  overflow: hidden;
`;

const PictureContainer = styled.div`
  position: sticky;
  top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  height: fit-content;

  @media screen and (max-width: 992px) {
    position: static;
    margin-bottom: 2rem;
  }
`;

const AboutText = styled.article`
  width: 65%;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media screen and (max-width: 992px) {
    height: auto;
    overflow-y: visible;
    padding-right: 0;
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

const LargeText = styled(Text)`
  font-size: 1.4rem;
  line-height: 1.4;

  @media screen and (max-width: 992px) {
    font-size: 1.4rem;
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

  &:before {
    content: "→";
    position: absolute;
    left: 0;
    color: black;
  }
`;

const CTASection = styled.div`
  padding-inline: 2rem;
  text-align: center;
`;
