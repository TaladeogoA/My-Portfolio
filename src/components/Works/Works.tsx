import gsap from "gsap";
import React from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import WorksContent from "./WorksContent";

const Works: React.FC = () => {
  const works = gsap.timeline();

  return (
    <>
      <PageTransition timeline={works} />
      <WorksContent />
    </>
  );
};

export default Works;
