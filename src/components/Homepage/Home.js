import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import HomeContent from "./HomeContent";

const Home = () => {
  const home = gsap.timeline();

  return (
    <div>
      <PageTransition timeline={home} />
      <div className="home-overlay"></div>
      <HomeContent />
    </div>
  );
};

export default Home;
