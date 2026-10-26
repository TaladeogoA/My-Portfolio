import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useLayoutEffect } from "react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

/** `<main id="main-content">` is the only scroll container on the site. */
const SCROLLER = "#main-content";

/**
 * Scroll-driven reveals for everything inside `ref`, opted into with data attributes:
 *
 * - `data-split`: heading words rise into place line by line.
 * - `data-fade`: fades and slides up as it enters.
 * - `data-stagger`: its children fade up one after another.
 * - `data-clip`: wipes open from the top, and its image settles from a slight zoom.
 * - `data-parallax`: its image drifts slowly while scrolling. Give the image room with overflow hidden.
 *
 * Does nothing when the visitor prefers reduced motion. Pass `key` to rerun it,
 * for example when the same component shows a different project.
 */
export const useScrollChoreography = (
  ref: RefObject<HTMLElement>,
  key?: unknown,
) => {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scroller = document.querySelector<HTMLElement>(SCROLLER) ?? undefined;
    const splits: SplitType[] = [];
    const reveals: gsap.core.Animation[] = [];
    const reveal = (trigger: Element, start = "top 88%") => ({
      trigger,
      scroller,
      start,
      once: true,
    });

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        const split = new SplitType(el, { types: "lines, words" });
        splits.push(split);
        // Each line clips its words, with a little room so descenders aren't cut.
        gsap.set(split.lines ?? [], {
          overflow: "hidden",
          paddingBottom: "0.12em",
          marginBottom: "-0.12em",
        });
        reveals.push(
          gsap.from(split.words ?? [], {
            yPercent: 115,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.035,
            scrollTrigger: reveal(el, "top 92%"),
          }),
        );
      });

      root.querySelectorAll<HTMLElement>("[data-fade]").forEach((el) => {
        reveals.push(
          gsap.from(el, {
            y: 28,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: reveal(el),
          }),
        );
      });

      root.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
        reveals.push(
          gsap.from(el.children, {
            y: 24,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            scrollTrigger: reveal(el),
          }),
        );
      });

      root.querySelectorAll<HTMLElement>("[data-clip]").forEach((el) => {
        const tl = gsap.timeline({ scrollTrigger: reveal(el, "top 90%") });
        reveals.push(tl);
        tl.fromTo(
          el,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            ease: "power4.inOut",
          },
        );
        // Parallax already handles the image's scale, so leave it alone there.
        const img = el.hasAttribute("data-parallax")
          ? null
          : el.querySelector("img");
        if (img) {
          tl.from(img, { scale: 1.18, duration: 1.4, ease: "power3.out" }, 0);
        }
      });

      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const img = el.querySelector("img");
        if (!img) return;
        gsap.fromTo(
          img,
          { yPercent: -5, scale: 1.1 },
          {
            yPercent: 5,
            scale: 1.1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              scroller,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // Things near the very end of a page can sit below their trigger point
      // even at full scroll, so reaching the bottom plays whatever is left.
      ScrollTrigger.create({
        trigger: root,
        scroller,
        start: () =>
          Math.max(1, ScrollTrigger.maxScroll(scroller ?? window) - 2),
        once: true,
        onEnter: () => reveals.forEach((animation) => animation.play()),
      });
    }, root);

    // Images change the page height as they load, which moves every trigger point.
    let refreshTimer = 0;
    const scheduleRefresh = () => {
      window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    };
    const images = Array.from(root.querySelectorAll("img")).filter(
      (img) => !img.complete,
    );
    images.forEach((img) => img.addEventListener("load", scheduleRefresh));
    scheduleRefresh();

    return () => {
      window.clearTimeout(refreshTimer);
      images.forEach((img) => img.removeEventListener("load", scheduleRefresh));
      ctx.revert();
      splits.forEach((split) => split.revert());
    };
  }, [ref, key]);
};
