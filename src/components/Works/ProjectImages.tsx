import React from "react";
import styled from "styled-components";
import { ProjectImagesProps } from "../../../types/project";

const ProjectImages: React.FC<ProjectImagesProps> = ({ project }) => {
  const images = [
    "https://picsum.photos/800/600?random=1",
    "https://picsum.photos/800/600?random=2",
    "https://picsum.photos/800/600?random=3",
  ];

  return (
    <Container>
      {images.map((src, index) => (
        <ProjectImage
          key={index}
          src={src}
          alt={`${project.title} view ${index + 1}`}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 40vh;
  object-fit: cover;
  display: block;
`;

export default ProjectImages;
