import styled from "styled-components";

const Technologies = () => {
  return (
    <Container>
      <OptionButton>What technologies are you proficient in?</OptionButton>
    </Container>
  );
};

export default Technologies;

const Container = styled.div`
  display: flex;
`;

const OptionButton = styled.span`
  background-color: #fff;
  width: max-content;
  border: solid 1px #000;
  color: #000;
  margin: 5px;
  margin-left: auto;
  padding: 10px;
  border-radius: 5px;
`;
