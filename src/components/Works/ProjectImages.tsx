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
        <React.Fragment key={index}>
          <AssetContainer onClick={() => handleAssetClick(asset)}>
            {asset.type === "video" ? (
              <ProjectVideo autoPlay muted loop playsInline src={asset.url} />
            ) : (
              <OptimizedImage
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
  height: 45vh;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const ProjectVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
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
