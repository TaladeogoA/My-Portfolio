import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner.tsx";

const Home = React.lazy(() => import("./components/Homepage/Home"));
const About = React.lazy(() => import("./components/AboutMe/About"));
const Contact = React.lazy(() => import("./components/Contact/Contact"));
const Works = React.lazy(() => import("./components/Works/WorksContent.tsx"));
const NotFound = React.lazy(() => import("./components/Common/NotFound.tsx"));

const AppRoutes: React.FC = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/work-details"
            element={<Navigate to="/works" replace />}
          />
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
};

export default AppRoutes;
