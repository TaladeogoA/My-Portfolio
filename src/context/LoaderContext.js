import React, { createContext, useEffect, useState } from "react";

export const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setIsLoading(false);
    };

    return () => {
      window.onload = null;
    };
  }, []);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
