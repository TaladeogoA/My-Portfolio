import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner.tsx";
import TransitionLayout from "./components/SpecialEffects/TransitionLayout.tsx";
import WorksContent from "./components/Works/WorksContent.tsx";

const Home = React.lazy(() => import("./components/Homepage/Home"));
const About = React.lazy(() => import("./components/AboutMe/AboutContent.js"));
const Contact = React.lazy(
  () => import("./components/Contact/ContactContent.js")
);
const Works = React.lazy(() => import("./components/Works/WorksContent.tsx"));
const NotFound = React.lazy(() => import("./components/Common/NotFound.tsx"));

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <TransitionLayout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/works" element={<WorksContent />}>
              <Route path=":projectId" element={<WorksContent />} />
            </Route>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TransitionLayout>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
