import styled from "styled-components";
import Resume from "../../assets/Taladeogo-Abraham-Resume.pdf";
import PictureAnimation from "./PictureAnimation";

const AboutContent = () => {
  const handleResumeClick = () => {
    window.open(Resume, "_blank", "noopener,noreferrer");
  };

  return (
    <Container>
      <PictureContainer>
        <PictureAnimation />
        <button onClick={handleResumeClick} aria-label="Open resume in new tab">
          View my Resume
        </button>
      </PictureContainer>
      <AboutText>
        <p>
          <span className="bold">Heyyy, </span>
          <br />
          My name is Táládeogó, but everybody calls me Talade. You can too.
        </p>
        <p>
          I'm a cross-platform developer specializing in web and mobile
          experiences. When I'm not coding, I'm a UI designer and illustrator
          with an eye for clean, minimal aesthetics.
        </p>
        <p>
          My journey spans art and technology - from architecture to web
          development, and now diving into native mobile development. Currently,
          I'm expanding my toolkit with Java for Android, while building apps
          with React Native. It's all about creating seamless experiences across
          every screen.
        </p>
        <p>
          Fun fact: I started as a web developer but got hooked on mobile
          development after building my first React Native app. Now I'm
          exploring the native side of things 📱
        </p>
        <p>Here's some of the tech I'm familiar with:</p>
        <div className="skill-container">
          <h4>Frontend Development:</h4>
          <div className="skills">
            <span className="tag">React</span>
            <span className="tag">React Native</span>
            <span className="tag">Next.js</span>
            <span className="tag">JavaScript (ES6+)</span>
            <span className="tag">TypeScript</span>
            <span className="tag">HTML5</span>
            <span className="tag">CSS3</span>
            <span className="tag">SASS</span>
            <span className="tag">Tailwind</span>
            <span className="tag">GSAP</span>
            <span className="tag">Three.js</span>
            <span className="tag">Styled Components</span>
            <span className="tag">Chakra UI</span>
            <span className="tag">RTL</span>
          </div>
        </div>

        <div className="skill-container">
          <h4>UI Design:</h4>
          <div className="skills">
            <span className="tag inverted">Figma</span>
            <span className="tag inverted">Adobe XD</span>
            <span className="tag inverted">Blender</span>
          </div>
        </div>

        <div className="skill-container">
          <h4>Collaboration Tools:</h4>
          <div className="skills">
            <span className="tag">Git</span> <span className="tag">Jira</span>
            <span className="tag">Confluence</span>
          </div>
        </div>

        <div className="skill-container">
          <h4>Currently Learning:</h4>
          <div className="skills">
            <span className="tag inverted">Java</span>
            <span className="tag inverted">Unity</span>
            <span className="tag inverted">AR Core</span>
            <span className="tag inverted">AR Foundation</span>
            <span className="tag inverted">Vuforia</span>
          </div>
        </div>
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

  @media screen and (max-width: 992px) {
    height: auto;
    width: 100%;
    overflow: visible;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    padding: 0 1rem;
  }
`;

const AboutText = styled.article`
  width: 60%;
  height: calc(100vh - 6rem);
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-right: 1rem;

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

  p {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    line-height: 1.5;
    margin-right: 2rem;

    span {
      &.bold {
        font-weight: 700;
        font-size: 1.8rem;
      }

      &.semiBold {
        font-weight: 600;
        font-size: 1.1rem;
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

  button {
    font-size: 1.2rem;
    background-color: black;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 10px 30px;
    cursor: pointer;
    width: 80%;
    transition: width 0.3s ease-in-out;

    &:hover {
      width: 90%;
    }
  }
`;
