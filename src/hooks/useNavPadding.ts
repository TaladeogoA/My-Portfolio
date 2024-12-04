import { useLocation } from "react-router-dom";

const NAV_WIDTH = 50;

export const useNavPadding = () => {
  const location = useLocation();
  const path = location.pathname;

  switch (path) {
    case "/":
      return {
        left: NAV_WIDTH * 3,
        right: NAV_WIDTH,
      };
    case "/about":
      return {
        left: NAV_WIDTH * 2,
        right: NAV_WIDTH * 2,
      };
    case "/works":
      return {
        left: NAV_WIDTH,
        right: NAV_WIDTH * 3,
      };
    case "/contact":
      return {
        left: 0,
        right: NAV_WIDTH * 4,
      };
    default:
      return {
        left: NAV_WIDTH * 3,
        right: NAV_WIDTH,
      };
  }
};
