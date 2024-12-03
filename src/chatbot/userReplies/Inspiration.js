import styled from "styled-components";

const Inspiration = () => {
  return (
    <Container>
      <OptionButton>
        What inspired you to become a frontend developer?
      </OptionButton>
    </Container>
  );
};

export default Inspiration;

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
