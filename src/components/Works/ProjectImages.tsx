import React, { useState } from "react";
import styled from "styled-components";
import { Asset, ProjectImagesProps } from "../../types/project";
import ImageModal from "./ImageModal";
import { OptimizedImage } from "./OptimizedImage";

const ProjectImages: React.FC<ProjectImagesProps> = ({ project }) => {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleAssetClick = (asset: Asset) => {
    setSelectedAsset(asset);
  };

  return (
    <Container>
      {project.assets.map((asset, index) => (
        <React.Fragment key={`${project.id}-${index}`}>
          <AssetContainer onClick={() => handleAssetClick(asset)}>
            {asset.type === "video" ? (
              <ProjectVideo autoPlay muted loop playsInline src={asset.url} />
            ) : (
              <ResponsiveImage
                src={asset.url}
                alt={`${project.title} view ${index + 1}`}
              />
            )}
          </AssetContainer>
        </React.Fragment>
      ))}
      <ImageModal
        asset={selectedAsset!}
        isOpen={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />
    </Container>
  );
};

const AssetContainer = styled.div`
  width: 100%;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
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

  & > div,
  img {
    height: auto !important;
    position: relative !important;
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
