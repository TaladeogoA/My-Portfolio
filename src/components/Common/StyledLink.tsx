import styled from "styled-components";

export const StyledLink = styled.a`
  color: #000;
  text-decoration: none;
  position: relative;
  font-weight: 500;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #000;
    transform: scaleX(1);
    transform-origin: bottom left;
    transition: transform 0.3s ease;
  }

  &:hover::after {
    transform: scaleX(0);
    transform-origin: bottom right;
  }

  &:focus {
    outline: none;
    text-decoration: underline;
  }
`;
