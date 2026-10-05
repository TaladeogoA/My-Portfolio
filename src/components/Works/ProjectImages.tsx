import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Asset, ProjectImagesProps } from "../../types/project";
import ImageModal from "./ImageModal";
import { OptimizedImage } from "./OptimizedImage";

const ProjectImages: React.FC<ProjectImagesProps> = ({ project }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const handleClose = useCallback(() => setSelectedAsset(null), []);

  return (
    <Container>
      {project.assets.map((asset, index) => {
        const alt = asset.alt ?? `${project.title} view ${index + 1}`;

        return (
          <AssetButton
            key={`${project.id}-${index}`}
            type="button"
            onClick={() => setSelectedAsset(asset)}
            aria-label={`View larger: ${alt}`}
          >
            {asset.type === "video" ? (
              <ProjectVideo autoPlay muted loop playsInline src={asset.url} />
            ) : (
              <ResponsiveImage
                src={asset.url}
                alt=""
                width={asset.width}
                height={asset.height}
                loading={index === 0 ? "eager" : "lazy"}
              />
            )}
          </AssetButton>
        );
      })}
      <ImageModal asset={selectedAsset} onClose={handleClose} />
    </Container>
  );
};

const AssetButton = styled.button`
  display: block;
  width: 100%;
  padding: 0;
  cursor: zoom-in;
  transition: opacity 0.2s ease;

  @media (hover: hover) {
    &:hover {
      opacity: 0.88;
    }
  }

  &:focus-visible {
    outline-offset: -4px;
  }
`;

const ProjectVideo = styled.video`
  width: 100%;
  height: auto;
  display: block;
`;

const ResponsiveImage = styled(OptimizedImage)`
  width: 100%;
  height: auto !important;

  img {
    height: auto !important;
  }
`;

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ProjectImages;
