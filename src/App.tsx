import React, { Suspense } from "react";
import AnimatedCursor from "react-animated-cursor";
import { HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import "./App.css";
import AppRoutes from "./AppRoutes";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner";
import PageLayout from "./components/Layout/PageLayout";
import { useMediaQuery } from "./hooks/useMediaQuery";

const App: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const location = useLocation();

  // Detect if we're on the article page
  // Adjust the condition to match your article route pattern
  const isArticlePage = /^\/blog\/[^/]+$/.test(location.pathname);

  return (
    <HelmetProvider>
      <div className="App" role="main">
        {!isMobile && (
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
            {isArticlePage ? (
              <AppRoutes />
            ) : (
              <PageLayout>
                <AppRoutes />
              </PageLayout>
            )}
          </Suspense>
        </ErrorBoundary>
      </div>
    </HelmetProvider>
  );
};

export default App;
