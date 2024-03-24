import React from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import AboutContent from "./AboutContent";

const About = () => {
  const about = gsap.timeline();

  return (
    <>
      <PageTransition timeline={about} />
      <div className="overlay"></div>
      <AboutContent />
    </>
  );
};

export default About;
