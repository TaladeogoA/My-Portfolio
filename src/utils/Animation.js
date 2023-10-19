import gsap from "gsap";
import SplitType from "split-type";

export const animateSplitType = (elementRef) => {
  const header = SplitType.create(elementRef.current, {
    types: "chars",
    reduceWhiteSpace: true,
  });
  const chars = header.chars;

  gsap.fromTo(
    chars,
    {
      autoAlpha: 0,
      y: 100,
    },
    {
      autoAlpha: 1,
      y: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    }
  );
};

export const animateFromTop = (
  elementRef,
  distance = 700,
  duration = 10,
  delay = 0
) => {
  const element = elementRef.current;
  gsap.from(element, {
    y: -distance,
    opacity: 0,
    duration,
    delay,
    ease: "power3.out",
  });
};

export const animateFalling = (element, duration = 0.5) => {
  return gsap.from(element, {
    y: -100,
    opacity: 0,
    duration,
    ease: "power4.out",
  });
};

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
