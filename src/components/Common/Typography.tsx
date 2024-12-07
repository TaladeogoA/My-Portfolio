import styled, { css } from "styled-components";

interface TextProps {
  bold?: boolean;
  muted?: boolean;
  $margin?: string;
  $align?: "left" | "center" | "right";
  $size?: "small" | "medium" | "large" | string;
  $color?: string;
}

interface HeadingProps extends TextProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const baseHeadingStyles = css<HeadingProps>`
  margin: ${({ $margin }) => $margin || "0 0 1rem 0"};
  text-align: ${({ $align }) => $align || "left"};
  font-weight: ${({ bold }) => (bold ? 700 : 600)};
  color: ${({ $color, muted }) => {
    if ($color) return $color;
    return muted ? "#666" : "#000";
  }};
  line-height: 1.2;
  transition: color 0.3s ease;
`;

const getFontSize = (size: TextProps["$size"]) => {
  switch (size) {
    case "small":
      return "1rem";
    case "medium":
      return "1.2rem";
    case "large":
      return "1.4rem";
    default:
      return size || "1.2rem";
  }
};

export const H1 = styled.h1<HeadingProps>`
  ${baseHeadingStyles}
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const H2 = styled.h2<HeadingProps>`
  ${baseHeadingStyles}
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const H3 = styled.h3<HeadingProps>`
  ${baseHeadingStyles}
  font-size: 1.5rem;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const H4 = styled.h4<HeadingProps>`
  ${baseHeadingStyles}
  font-size: 1.2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const Text = styled.p<TextProps>`
  font-size: ${({ $size }) => getFontSize($size)};
  line-height: 1.6;
  margin: ${({ $margin }) => $margin || "0 0 1rem 0"};
  text-align: ${({ $align }) => $align || "left"};
  font-weight: ${({ bold }) => (bold ? 600 : 400)};
  color: ${({ $color, muted }) => {
    if ($color) return $color;
    return muted ? "#666" : "#1a1a1a";
  }};
  transition: color 0.3s ease;
`;

export const SmallText = styled(Text)`
  font-size: 1.2rem;
`;

export const LargeText = styled(Text)`
  font-size: 1.6rem;
`;
