import React, { useState } from "react";
import styled from "styled-components";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <ImageWrapper className={className}>
      <StyledImage
        src={src}
        alt={alt}
        loading="lazy"
        $isLoading={isLoading}
        onLoad={() => setIsLoading(false)}
      />
    </ImageWrapper>
  );
};

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const StyledImage = styled.img<{ $isLoading: boolean }>`
  width: 100%;
  height: 100%;
  /* object-fit: contain; */
  transition: all 0.7s ease-in-out;
  transform: scale(${(props) => (props.$isLoading ? 1.1 : 1)});
  filter: ${(props) =>
    props.$isLoading ? "blur(10px) grayscale(100%)" : "blur(0) grayscale(0)"};
`;
