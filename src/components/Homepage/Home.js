import React from "react";
import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";

import HomeContent from "./HomeContent";

const Home = () => {
  const home = gsap.timeline();

  return (
    <div className="home-container">
      <div className="image-overlay">
        <img src="./black-white-code.png" alt="html background" />
      </div>
      <PageTransition timeline={home} />
      <HomeContent />
    </div>
  );
};

export default Home;
