import styled from "styled-components";
import PictureAnimation from "./PictureAnimation";

const AboutContent = () => {
  return (
    <Container>
      <PictureContainer>
        <PictureAnimation />
        <button>View my Resume</button>
      </PictureContainer>
      <AboutText>
        <p>
          <span className="bold">Heyyy, </span>
          <br />
          My name is Táládeogó, but everybody calls me Talade. You can too.
        </p>
        <p>
          I'm a frontend dev with a passion for crafting captivating web
          experiences. I'm also a UI designer and illustrator with a knack for a
          clean and minimal aesthetic.
        </p>
        <p>
          I've always been on the cusp of art and tech, from my architecture
          days, to web design and development, and my interests in game and AR
          development now. It's a journey where creativity and technology
          intertwine seamlessly.
        </p>
        <p>
          Fun fact: I have an unbroken streak of using Toshiba PCs since the
          beginning of my web development journey. It's my secret weapon now 🙂.
        </p>
        <p>Here's some of the tech I'm familiar with:</p>
        <div className="skill-container">
          <h4>Frontend Development:</h4>
          <div className="skills">
            <span className="tag">Next</span> <span className="tag">React</span>{" "}
            <span className="tag">Context</span>{" "}
            <span className="tag">GSAP</span>{" "}
            <span className="tag">JavaScript (ES6+)</span>{" "}
            <span className="tag">HTML5</span> <span className="tag">CSS3</span>{" "}
            <span className="tag">Styled Components</span>{" "}
            <span className="tag">Chakra UI</span>{" "}
            <span className="tag">RTL</span>
          </div>
        </div>

        <div className="skill-container">
          <h4>UI Design:</h4>
          <div className="skills">
            <span className="tag inverted">Figma</span>{" "}
            <span className="tag inverted">Adobe XD</span>{" "}
            <span className="tag inverted">Blender</span>{" "}
          </div>
        </div>

        <div className="skill-container">
          <h4>Collaboration Tools:</h4>
          <div className="skills">
            <span className="tag">Git</span> <span className="tag">Jira</span>{" "}
            <span className="tag">Confluence</span>
          </div>
        </div>

        <div className="skill-container">
          <h4>Currently Learning:</h4>
          <div className="skills">
            <span className="tag inverted">C#</span>{" "}
            <span className="tag inverted">Unity</span>{" "}
            <span className="tag inverted">AR Core</span>{" "}
            <span className="tag inverted">AR Foundation</span>{" "}
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
  gap: 3rem;
  width: 70%;
  max-width: 70vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 992px) {
    position: static;
    transform: translate(0, 0);
    width: 100%;
    max-width: 100%;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    margin-top: 5rem;
    padding: 0 1rem;
    /* min-height: 100%; */
    overflow: auto;
  }
`;

const AboutText = styled.article`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media screen and (max-width: 992px) {
    max-height: none;
    overflow-y: visible;
    scrollbar-width: auto;
    -ms-overflow-style: auto;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

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
      font-weight: 600;
    }
  }
`;
