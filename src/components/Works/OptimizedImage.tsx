import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain" | "scale-down";
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  fit = "cover",
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return (
    <ImageWrapper className={className}>
      {isLoading && <Skeleton />}
      <StyledImage
        src={src}
        alt={alt}
        loading="lazy"
        $isLoading={isLoading}
        $fit={fit}
        onLoad={() => setIsLoading(false)}
      />
    </ImageWrapper>
  );
};

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;

const Skeleton = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #f6f7f8;
  background-image: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 104px;
  animation: ${shimmer} 1s linear infinite;
  z-index: 1;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: #f8f7f4;
`;

const StyledImage = styled.img<{
  $isLoading: boolean;
  $fit: "cover" | "contain" | "scale-down";
}>`
  width: 100%;
  height: 100%;
  object-fit: ${(props) => props.$fit};
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$isLoading ? 0 : 1)};
`;
