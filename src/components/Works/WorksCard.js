import styled from "styled-components";
import React from "react";

const WorksCard = ({
  handleMouseMove,
  handleMouseLeave,
  title,
  serial,
  image,
  onClick,
}) => {
  return (
    <Container
      onMouseMove={(e) => handleMouseMove(e, image)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div>
        <h2>{title}</h2>
        <p>{serial}</p>
      </div>
    </Container>
  );
};

export default WorksCard;

const Container = styled.div`
  text-decoration: none;
  color: inherit;
  height: 100%;
  display: flex;
  gap: 1rem;
  position: relative;
  border-right: 1px solid darkgray;
  cursor: pointer;

  &:hover {
    padding-bottom: 3rem;
    transition: all 0.5s ease;
  }

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
