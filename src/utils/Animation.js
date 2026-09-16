import gsap from "gsap";
import SplitType from "split-type";

export const animateText = (element, duration = 0.3) => {
  const split = new SplitType(element, {
    types: "chars,words",
    reduceWhiteSpace: true,
  });
  const chars = split.chars;

  gsap.set(chars, { x: 100, opacity: 0 });

  return gsap.fromTo(
    chars,
    { x: 100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration,
      stagger: 0.05,
      ease: "power4.out",
    }
  );
};
