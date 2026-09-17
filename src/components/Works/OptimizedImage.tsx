import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fit?: "cover" | "contain" | "scale-down";
  width?: number;
  height?: number;
  loading?: "lazy" | "eager";
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className,
  fit = "cover",
  width,
  height,
  loading = "lazy",
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const isLoading = loadedSrc !== src;

  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoadedSrc(src);
    }
  }, [src]);

  return (
    <ImageWrapper className={className}>
      {isLoading && <Skeleton />}
      <StyledImage
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        $isLoading={isLoading}
        $fit={fit}
        onLoad={() => setLoadedSrc(src)}
        onError={() => setLoadedSrc(src)}
      />
    </ImageWrapper>
  );
};

const shimmer = keyframes`
  0% {
    background-position: 150% 0;
  }
  100% {
    background-position: -50% 0;
  }
`;

const Skeleton = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #eeece7;
  background-image: linear-gradient(
    90deg,
    #eeece7 0%,
    #f6f5f1 50%,
    #eeece7 100%
  );
  background-repeat: no-repeat;
  background-size: 200% 100%;
  animation: ${shimmer} 1.4s ease-in-out infinite;
  z-index: 1;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
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
