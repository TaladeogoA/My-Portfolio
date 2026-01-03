import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback } from "react";
import { NavLink as Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
// @ts-ignore
import Logo from "../../assets/logo.png";

export const NAV_ORDER = {
  "/": 1,
  "/about": 2,
  "/works": 3,
  "/contact": 4,
} as const;

interface NavLinkStyleProps {
  $order: number;
  $currentOrder: number;
}

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentOrder =
    NAV_ORDER[location.pathname as keyof typeof NAV_ORDER] || 1;

  const handleNavigation = useCallback(
    (to: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      navigate(to);
    },
    [navigate]
  );

  const slideVariants = {
    initial: (direction: "left" | "right" | null) => ({
      x: direction === "right" ? "100%" : "-100%",
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.645, 0.045, 0.355, 1],
        delay: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Navigation>
        <LeftNav>
          <AnimatePresence mode="popLayout">
            {Object.entries(NAV_ORDER)
              .filter(([_, order]) => order > currentOrder)
              .sort((a, b) => b[1] - a[1])
              .map(([path, order]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={handleNavigation(path)}
                  $order={order}
                  $currentOrder={currentOrder}
                  custom="left"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h5>{`00${order}`}</h5>
                  <h3>{path.slice(1)}</h3>
                </NavLink>
              ))}
          </AnimatePresence>
        </LeftNav>

        <RightNav>
          <AnimatePresence mode="popLayout">
            {Object.entries(NAV_ORDER)
              .filter(([_, order]) => order <= currentOrder)
              .reverse()
              .map(([path, order]) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={handleNavigation(path)}
                  $order={order}
                  $currentOrder={currentOrder}
                  className={location.pathname === path ? "active" : ""}
                  custom="right"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <h5>{`00${order}`}</h5>
                  {path === "/" ? (
                    <img className="logo" src={Logo} alt="Logo" />
                  ) : (
                    <h3>{path.slice(1)}</h3>
                  )}
                </NavLink>
              ))}
          </AnimatePresence>
        </RightNav>
      </Navigation>

      <MobileNav>
        {Object.entries(NAV_ORDER).map(([path, order]) => (
          <MobileLink
            key={path}
            to={path}
            onClick={handleNavigation(path)}
            $isActive={location.pathname === path}
          >
            <p className="text">{path === "/" ? "Home" : path.slice(1)}</p>
          </MobileLink>
        ))}
      </MobileNav>
    </>
  );
};

const Navigation = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  z-index: 100;
  font-family: "Kodchasan", sans-serif;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const NavSection = styled.nav`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  pointer-events: all;
`;

const LeftNav = styled(NavSection)`
  left: 0;
`;

const RightNav = styled(NavSection)`
  right: 0;
`;

const NavLink = styled(motion(Link))<NavLinkStyleProps>`
  height: 100%;
  width: 50px;
  border-right: 1px solid #000;
  writing-mode: vertical-lr;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  background-color: #F8F7F4;
  color: #000;
  padding: 2rem 0;
  cursor: pointer;
  will-change: transform;
  transition: background-color 0.3s ease 0.2s, color 0.3s ease 0.2s;

  h3,
  h5,
  .logo {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  h5 {
    letter-spacing: 3px;
  }

  .logo {
    width: 25px;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      filter 0.3s ease 0.2s;
  }

  &:hover {
    h3,
    h5,
    .logo {
      transform: translate3d(0, -1rem, 0);
    }
  }

  &.active {
    background: #000;
    color: #F8F7F4;
    .logo {
      filter: invert(1);
    }
  }
`;

const MobileNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: white;
  border-top: 1px solid black;
  z-index: 100;
  font-family: "Kodchasan", sans-serif;

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
  }
`;

const MobileLink = styled(Link)<{ $isActive?: boolean }>`
  text-decoration: none;
  color: black;
  text-decoration: ${({ $isActive }) => ($isActive ? "underline" : "none")};
  padding: 0.5rem 1rem;
  border-radius: 2px;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  .text {
    margin: 0;
    text-transform: capitalize;
  }
`;

export default NavBar;
