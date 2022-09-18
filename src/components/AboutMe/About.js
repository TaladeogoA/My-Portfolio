import React from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import AboutContent from "./AboutContent";
import NavBar from "../Navbar/NavBar";
// import CustomCursor from "../SpecialEffects/CustomCursor";

const About = () => {
  const about = gsap.timeline();

  return (
    <div>
      {/* <NavBar /> */}
      <PageTransition timeline={about} />
      <div className="about-overlay"></div>
      <AboutContent />
    </div>
  );
};

export default About;
