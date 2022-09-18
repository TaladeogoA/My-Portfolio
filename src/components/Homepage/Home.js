import PageTransition from "../SpecialEffects/PageTransition";
import gsap from "gsap";
import HomeContent from "./HomeContent";
import NavBar from "../Navbar/NavBar";
// import CustomCursor from "../SpecialEffects/CustomCursor";

const Home = () => {
  const home = gsap.timeline();

  return (
    <div>
      {/* <NavBar /> */}
      <PageTransition timeline={home} />
      <div className="home-overlay"></div>
      <HomeContent />
    </div>
  );
};

export default Home;
