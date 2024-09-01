import React from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import AboutContent from "./AboutContent";

const About = () => {
  const about = gsap.timeline();

  return (
    <>
      <PageTransition timeline={about} />
      <AboutContent />
    </>
  );
};

export default About;
