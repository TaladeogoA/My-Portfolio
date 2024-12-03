import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useTransitionState = () => {
  const location = useLocation();
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    setShouldAnimate(true);
  }, [location.key]);

  return { shouldAnimate, key: location.key };
};
