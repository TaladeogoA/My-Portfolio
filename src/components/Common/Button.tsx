import { motion } from "framer-motion";
import styled, { css } from "styled-components";

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

const baseButtonStyles = css<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  font-family: inherit;
  width: ${({ $width }) => $width || "auto"};
  height: ${({ $height }) => $height || "40px"};
  padding: ${({ $padding }) => $padding || "0 1.5rem"};
  font-size: ${({ $fontSize }) => $fontSize || "1.4rem"};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  transition: all 0.2s ease;
  will-change: transform;
  border-radius: 15px;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

const primaryStyles = css<ButtonProps>`
  background-color: black;
  color: white;

  &:hover:not(:disabled) {
    background-color: #333;
  }
`;

const secondaryStyles = css<ButtonProps>`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const Button = styled(motion.button).attrs<ButtonProps>(({ type }) => ({
  type: type || "button",
}))<ButtonProps>`
  ${baseButtonStyles}
  ${({ variant }) =>
    variant === "secondary" ? secondaryStyles : primaryStyles}
`;
