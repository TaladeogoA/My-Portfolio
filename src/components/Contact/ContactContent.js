import React from "react";
import styled from "styled-components";

const ContactContent = () => {
  return (
    <Container className="container">
      <p>
        Don't be a stranger, say hello! <br /> Send me an email at{" "}
        <a href="mailto:ataladeogo@gmail.com">ataladeogo@gmail.com</a> or reach
        out on{" "}
        <a
          href="https://www.linkedin.com/in/taladeogo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{" "}
        .
      </p>
      <p>
        You can also find me liking all the tweets that say what I'm thinking on{" "}
        <a
          href="https://twitter.com/taladeogo_"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Twitter
        </a>{" "}
        or documenting my learning journey on{" "}
        <a
          href="https://github.com/TaladeogoA"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
      <p>I look forward to hearing from you!</p>
    </Container>
  );
};

export default ContactContent;

const Container = styled.main`
  left: 40%;

  p {
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 400;
    font-family: "Mate", serif;
    margin-bottom: 1rem;

    a {
      color: #000;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;
