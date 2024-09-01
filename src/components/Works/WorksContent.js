import styled from "styled-components";
import WorksCard from "./WorksCard";
import React, { useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { data as ProjectData } from "../../data/projectdata";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const WorksContent = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const workContentRef = useRef(null);

  const handleMouseMove = (e, image) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setImage(image);
    setShowImage(true);
  };

  const handleMouseLeave = () => {
    setShowImage(false);
  };

  useGSAP(() => {
    if (showContent) {
      gsap.fromTo(
        workContentRef.current,
        { y: "100%" },
        { y: "5%", duration: 0.5, ease: "power2.out" }
      );
    }
  }, [showContent]);

  const handleCloseContent = () => {
    gsap.to(workContentRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => setShowContent(false),
    });
  };

  return (
    <>
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
              onClick={() => setShowContent(true)}
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
      {showContent && (
        <WorkContent ref={workContentRef}>
          <TfiClose
            size={25}
            style={{
              marginLeft: "98%",
              cursor: "pointer",
            }}
            onClick={handleCloseContent}
          />
        </WorkContent>
      )}
    </>
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

  > :first-child {
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

const WorkContent = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transform: translateY(100%);
`;
