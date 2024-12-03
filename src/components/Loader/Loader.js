import { useContext } from "react";
import styled from "styled-components";
import { LoaderContext } from "../../context/LoaderContext";

const Loader = () => {
  const { isLoading } = useContext(LoaderContext);

  if (isLoading) {
    return (
      <LoaderContainer className={`loader ${isLoading ? "show" : "hide"}`}>
        <p>Loading...</p>
      </LoaderContainer>
    );
  } else return null;
};

export default Loader;

const LoaderContainer = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  p {
    font-size: 1.5rem;
    font-weight: 400;
  }
`;
