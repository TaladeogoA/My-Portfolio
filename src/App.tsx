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
  const isMobile = useMediaQuery("(max-width: 768px)");

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
            <PageLayout>
              <AppRoutes />
            </PageLayout>
          </Suspense>
        </ErrorBoundary>
      </div>
    </HelmetProvider>
  );
};

export default App;
