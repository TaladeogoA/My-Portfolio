import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import { getNavPath } from "./components/Navbar/NavBar";
import TransitionLayout from "./components/SpecialEffects/TransitionLayout";

const loadHome = () => import("./components/Homepage/Home");
const loadAbout = () => import("./components/AboutMe/AboutContent");
const loadContact = () => import("./components/Contact/ContactContent");
const loadWork = () => import("./components/Works/WorksContent");
const loadNotFound = () => import("./components/Common/NotFound");

const Home = React.lazy(loadHome);
const About = React.lazy(loadAbout);
const Contact = React.lazy(loadContact);
const Work = React.lazy(loadWork);
const NotFound = React.lazy(loadNotFound);

const prefetchRoutes = () => {
  [loadHome, loadAbout, loadWork, loadContact].forEach((load) => load());
};

const AppRoutes: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const { connection } = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    if (connection?.saveData) return;

    const idle = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    if (idle.requestIdleCallback && idle.cancelIdleCallback) {
      const id = idle.requestIdleCallback(prefetchRoutes, { timeout: 4000 });
      return () => idle.cancelIdleCallback?.(id);
    }

    const timer = window.setTimeout(prefetchRoutes, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        <TransitionLayout>
          <Routes location={location} key={getNavPath(location.pathname)}>
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
