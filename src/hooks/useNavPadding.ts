import { useLocation } from "react-router-dom";
import { getNavPath } from "../components/Navbar/NavBar";

const NAV_WIDTH = 50;

export const useNavPadding = () => {
  const location = useLocation();

  switch (getNavPath(location.pathname)) {
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
    case "/work":
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
