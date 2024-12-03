import React, { Suspense } from "react";
import AnimatedCursor from "react-animated-cursor";
import "./App.css";
import AppRoutes from "./AppRoutes.tsx";
import ErrorBoundary from "./components/Common/ErrorBoundary";
import LoadingSpinner from "./components/Common/LoadingSpinner.tsx";
import NavBar from "./components/Navbar/NavBar";
import { useMediaQuery } from "./hooks/useMediaQuery.ts";

const App: React.FC = () => {
  // Custom hook for responsive design
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="App" role="main">
      {/* Hide cursor animation on mobile devices */}
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
          <NavBar />
          <AppRoutes />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default App;
