import styled from "styled-components";

const Hi = () => {
  return (
    <Container>
      <OptionButton>Just saying hi!</OptionButton>
    </Container>
  );
};

export default Hi;

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
