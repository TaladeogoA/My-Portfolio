import "./App.css";
import { LoaderContextProvider } from "./context/LoaderContext";
import NavBar from "./components/Navbar/NavBar";
import AppRoutes from "./AppRoutes";
import Loader from "./components/Loader/Loader";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

function App() {
  return (
    <div className="App">
      {/* <LoaderContextProvider> */}
      {/* <Loader /> */}
      <NavBar />
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
      {/* </LoaderContextProvider> */}
    </div>
  );
}

export default App;

// My Media Queries
// sm: 640px,
// md: 768px,
// lg: 1024px,
// xl: 1280px,
// '2xl': 1536px,
