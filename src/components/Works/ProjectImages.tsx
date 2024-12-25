import React from "react";
import styled from "styled-components";
import { ProjectImagesProps } from "../../types/project";

const ProjectImages: React.FC<ProjectImagesProps> = ({ project }) => {
  return (
    <Container>
      {project.assets.map((asset, index) => (
        <React.Fragment key={index}>
          <AssetContainer>
            {asset.type === "video" ? (
              <ProjectVideo autoPlay muted loop playsInline src={asset.url} />
            ) : (
              <ProjectImage
                src={asset.url}
                alt={`${project.title} view ${index + 1}`}
              />
            )}
          </AssetContainer>
          {/* {index < project.assets.length - 1 && <Separator />} */}
        </React.Fragment>
      ))}
    </Container>
  );
};

const AssetContainer = styled.div`
  width: 100%;
  height: 45vh;
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

const Separator = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
  margin: 0;
`;

export default ProjectImages;
