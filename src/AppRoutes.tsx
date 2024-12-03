import React, { Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner.tsx";
import TransitionLayout from "./components/SpecialEffects/TransitionLayout.tsx";

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
            <Route path="/works" element={<Works />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/work-details"
              element={<Navigate to="/works" replace />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TransitionLayout>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
