import HomeContent from "./HomeContent";

const Home = () => {
  return (
    <div className="home-container">
      <div className="image-overlay">
        <img src="./black-white-code.png" alt="html background" />
      </div>

      <HomeContent />
    </div>
  );
};

export default Home;
