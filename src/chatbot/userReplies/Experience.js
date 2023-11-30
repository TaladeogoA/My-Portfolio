import React from "react";
import styled from "styled-components";

const Experience = () => {
  return (
    <Container>
      <OptionButton>Tell me about your work experience.</OptionButton>
    </Container>
  );
};

export default Experience;

const Container = styled.div`
  display: flex;
`;

const OptionButton = styled.span`
  font-family: "Mate", sans-serif;
  background-color: #fff;
  width: max-content;
  border: solid 1px #000;
  color: #000;
  margin: 5px;
  margin-left: auto;
  padding: 10px;
  border-radius: 5px;
`;
