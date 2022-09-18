import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import { useEffect, useRef, useState } from "react";
import CustomCursor from "./components/SpecialEffects/CustomCursor";
import AppRoutes from "./AppRoutes";

function App() {
  const [preloader, setPreloader] = useState(true);
  const [timer, setTimer] = useState(2);
  const id = useRef(null);

  const clear = () => {
    window.clearInterval(id.current);
    setPreloader(false);
  };

  useEffect(() => {
    id.current = window.setInterval(() => {
      setTimer((timer) => {
        if (timer === 0) {
          clear();
        }
        return timer - 1;
      });
    }, 1000);
    if (timer === 0) {
      clear();
    }
  }, [timer]);

  return (
    <div className="App">
      {/* <CustomCursor /> */}
      {preloader ? (
        <div className="container">Loading...</div>
      ) : (
        <>
          <NavBar />
          <AppRoutes />
        </>
      )}
    </div>
  );
}

export default App;
