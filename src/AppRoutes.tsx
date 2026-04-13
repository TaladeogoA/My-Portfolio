import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import TransitionLayout from "./components/SpecialEffects/TransitionLayout";

const Home = React.lazy(() => import("./components/Homepage/Home"));
const About = React.lazy(() => import("./components/AboutMe/AboutContent"));
const Contact = React.lazy(() => import("./components/Contact/ContactContent"));
const Work = React.lazy(() => import("./components/Works/WorksContent"));
const NotFound = React.lazy(() => import("./components/Common/NotFound"));

const AppRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <TransitionLayout>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />}>
              <Route path=":projectId" element={<Work />} />
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
