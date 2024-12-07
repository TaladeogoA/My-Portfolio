import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NAV_ORDER } from "../components/Navbar/NavBar";

export const useTransitionState = () => {
  const location = useLocation();
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    if (prevPath !== location.pathname) {
      const prevOrder = NAV_ORDER[prevPath as keyof typeof NAV_ORDER] || 1;
      const currentOrder =
        NAV_ORDER[location.pathname as keyof typeof NAV_ORDER] || 1;
      setDirection(currentOrder > prevOrder ? "right" : "left");
      setPrevPath(location.pathname);
    }
    setShouldAnimate(true);
  }, [location.key, location.pathname, prevPath]);

  return { shouldAnimate, key: location.key, direction };
};
