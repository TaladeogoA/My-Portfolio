import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import WorksContent from "./WorksContent";

const Works = () => {
  const works = gsap.timeline();

  return (
    <>
      <PageTransition timeline={works} />
      <div className="works-overlay"></div>
      <WorksContent />
    </>
  );
};

export default Works;
