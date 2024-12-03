import gsap from "gsap";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const usePageTransition = () => {
  const location = useLocation();
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    if (transitionRef.current) {
      // Enter animation
      tl.fromTo(
        transitionRef.current,
        { x: "-100%" },
        {
          x: 0,
          duration: 0.6,
          ease: "power4.inOut",
        }
      ).to(transitionRef.current, {
        x: "100%",
        duration: 0.6,
        ease: "power4.inOut",
        delay: 0.1,
      });
    }

    return () => tl.kill();
  }, [location.pathname]);

  return transitionRef;
};
