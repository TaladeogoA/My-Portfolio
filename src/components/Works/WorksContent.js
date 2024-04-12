import styled from "styled-components";
import WorksCard from "./WorksCard";
import { useState } from "react";
import { data as ProjectData } from "../../data/projectdata";

const WorksContent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);

  const handleMouseMove = (e, image) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setImage(image);
    setShowImage(true);
  };

  const handleMouseLeave = () => {
    setShowImage(false);
  };

  return (
    <Container>
      <div>
        {ProjectData.map((project) => (
          <WorksCard
            key={project.id}
            handleMouseMove={handleMouseMove}
            handleMouseLeave={handleMouseLeave}
            title={project.title}
            serial={project.id}
            image={project.image}
          />
        ))}
        {showImage && (
          <HiddenImage
            src={image}
            alt="project"
            style={{
              top: position.y,
              left: position.x,
              width: "200px",
              height: "200px",
            }}
          />
        )}
      </div>
    </Container>
  );
};

export default WorksContent;

const Container = styled.div`
  width: 80%;
  height: 100%;
  max-width: 92vw;
  position: absolute;
  left: 45%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* border: 1px solid red; */

  > div {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: flex-start;
  }
`;

const HiddenImage = styled.img`
  display: block;
  position: absolute;
  pointer-events: none;
`;
