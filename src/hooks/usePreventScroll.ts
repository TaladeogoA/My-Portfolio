import { useEffect } from "react";

export const usePreventScroll = (isExpanded: boolean) => {
  useEffect(() => {
    if (isExpanded) {
      const scrollPosition = window.scrollY;
      window.scrollTo(0, scrollPosition);
    }
  }, [isExpanded]);
};
