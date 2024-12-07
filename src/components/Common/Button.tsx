import { motion } from "framer-motion";
import styled, { css, keyframes } from "styled-components";

interface ButtonProps {
  variant?: "primary" | "secondary";
  disabled?: boolean;
  $width?: string;
  $height?: string;
  $padding?: string;
  $fontSize?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}

const loadingAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const baseButtonStyles = css<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 2px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-family: inherit;
  width: ${({ $width }) => $width || "auto"};
  height: ${({ $height }) => $height || "40px"};
  padding: ${({ $padding }) => $padding || "0 2rem"};
  font-size: ${({ $fontSize }) => $fontSize || "1.2rem"};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  position: relative;
  overflow: hidden;
  letter-spacing: 0.5px;
  will-change: transform;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  ${({ loading }) =>
    loading &&
    css`
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: rgba(255, 255, 255, 0.4);
        animation: ${loadingAnimation} 1s infinite;
      }
    `}
`;

const primaryStyles = css<ButtonProps>`
  background-color: black;
  color: white;
  transform-origin: center;
  border: 1px solid black;

  &:hover:not(:disabled) {
    background-color: white;
    color: black;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
`;

const secondaryStyles = css<ButtonProps>`
  background-color: white;
  color: black;
  border: 1px solid black;
  transform-origin: center;

  &:hover:not(:disabled) {
    background-color: black;
    color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: none;
  }
`;

export const Button = styled(motion.button).attrs<ButtonProps>(({ type }) => ({
  type: type || "button",
  whileTap: { scale: 0.98 },
}))<ButtonProps>`
  ${baseButtonStyles}
  ${({ variant }) =>
    variant === "secondary" ? secondaryStyles : primaryStyles}
`;
