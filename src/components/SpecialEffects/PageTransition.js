import React, { useRef, useEffect } from "react";
import "./PageTransition.css";
import { Power4 } from "gsap";

const PageTransition = ({ timeline }) => {
  const trans = useRef(null);
  useEffect(() => {
    timeline.to(trans.current, {
      duration: 2,
      x: 2500,
      ease: Power4.easeOut,
    });
  });
  return (
    <div>
      <div className="transition-effect" ref={trans}></div>
    </div>
  );
};

export default PageTransition;
