import styled from "styled-components";

const WorksCard = ({
  handleMouseMove,
  handleMouseLeave,
  title,
  serial,
  image,
}) => {
  return (
    <Container
      href="#"
      onMouseMove={(e) => handleMouseMove(e, image)}
      onMouseLeave={handleMouseLeave}
    >
      <div>
        <h2>{title}</h2>
        <p>{serial}</p>
      </div>
    </Container>
  );
};

export default WorksCard;

const Container = styled.a`
  text-decoration: none;
  color: inherit;
  height: 100%;
  display: flex;
  gap: 1rem;
  position: relative;
  border-right: 1px solid darkgray;

  > div {
    position: relative;
    padding: 3rem;
    display: flex;
    justify-content: space-between;
    width: 100%;
    writing-mode: vertical-rl;
  }

  h2 {
    text-transform: uppercase;
    top: 2rem;
    left: 9rem;
    font-size: 3rem;
    width: 80%;
  }

  p {
    width: 10%;
    font-family: "Mate", serif;
  }
`;
