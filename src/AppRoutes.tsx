import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import TransitionLayout from "./components/SpecialEffects/TransitionLayout";
import WorksContent from "./components/Works/WorksContent";

const Home = React.lazy(() => import("./components/Homepage/Home"));
const About = React.lazy(() => import("./components/AboutMe/AboutContent"));
const Contact = React.lazy(() => import("./components/Contact/ContactContent"));
const Works = React.lazy(() => import("./components/Works/WorksContent"));
const NotFound = React.lazy(() => import("./components/Common/NotFound"));

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
