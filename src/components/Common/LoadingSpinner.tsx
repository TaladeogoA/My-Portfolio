import React from "react";
import styled from "styled-components";

const LoadingSpinner: React.FC = () => (
  <SpinnerWrapper>
    <Spinner />
  </SpinnerWrapper>
);

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #000;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingSpinner;
