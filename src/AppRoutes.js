import { Routes, Route } from "react-router-dom";
import Home from "./components/Homepage/Home";
import About from "./components/AboutMe/About";
import Contact from "./components/Contact/Contact";
import Works from "./components/Works/Works";
import WorkDetails from "./components/Works/WorkDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/works" element={<Works />}></Route>
      <Route path="/works/:projectId" element={<WorkDetails />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} />
      <Route path="/work-details" element={<WorkDetails />} />
      {/* Add 404 Page */}
    </Routes>
  );
};

export default AppRoutes;
