import React from "react";
import styled from "styled-components";

const FunFact = () => {
  return (
    <Container>
      <OptionButton>Tell me a fun fact about yourself.</OptionButton>
    </Container>
  );
};

export default FunFact;

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
