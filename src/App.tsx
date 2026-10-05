import { MotionConfig } from "framer-motion";
import React, { Suspense } from "react";
import AnimatedCursor from "react-animated-cursor";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import AppRoutes from "./AppRoutes";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import PageLayout from "./components/Layout/PageLayout";
import { useMediaQuery } from "./hooks/useMediaQuery";

const App: React.FC = () => {
  const hasFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const showCursor = hasFinePointer && !prefersReducedMotion;

  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
        <div className="App">
          {showCursor && (
            <AnimatedCursor
              color="0, 0, 0"
              innerSize={8}
              outerSize={35}
              innerScale={1}
              outerScale={1.7}
            />
          )}
          <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
              <PageLayout>
                <AppRoutes />
              </PageLayout>
            </Suspense>
          </ErrorBoundary>
        </div>
      </MotionConfig>
    </HelmetProvider>
  );
};

export default App;
