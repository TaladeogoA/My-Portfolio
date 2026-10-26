import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { NavLink as Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/logo.png";

export const NAV_ORDER = {
  "/": 1,
  "/about": 2,
  "/work": 3,
  "/contact": 4,
} as const;

export const getNavPath = (pathname: string) => `/${pathname.split("/")[1]}`;

const NAV_LABELS: Record<string, string> = {
  "/": "Home",
  "/about": "About",
  "/work": "Work",
  "/contact": "Contact",
};

const slideVariants = {
  initial: (direction: "left" | "right" | null) => ({
    x: direction === "right" ? "100%" : "-100%",
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.645, 0.045, 0.355, 1],
      delay: 0.15,
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

const NavBar: React.FC = () => {
  const location = useLocation();
  const navPath = getNavPath(location.pathname);
  const currentOrder = NAV_ORDER[navPath as keyof typeof NAV_ORDER] || 1;

  return (
    <>
      <Navigation aria-label="Primary">
        <LeftNav>
          <AnimatePresence mode="popLayout">
            {Object.entries(NAV_ORDER)
              .filter(([_, order]) => order > currentOrder)
              .sort((a, b) => b[1] - a[1])
              .map(([path, order]) => (
                <NavLink
                  key={path}
                  to={path}
                  aria-label={NAV_LABELS[path]}
                  custom="left"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <span className="num" aria-hidden="true">{`00${order}`}</span>
                  <span className="label" aria-hidden="true">
                    {path.slice(1)}
                  </span>
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
                  aria-label={NAV_LABELS[path]}
                  className={navPath === path ? "active" : ""}
                  custom="right"
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <span className="num" aria-hidden="true">{`00${order}`}</span>
                  {path === "/" ? (
                    <img className="logo" src={Logo} alt="" />
                  ) : (
                    <span className="label" aria-hidden="true">
                      {path.slice(1)}
                    </span>
                  )}
                </NavLink>
              ))}
          </AnimatePresence>
        </RightNav>
      </Navigation>

      <MobileNav aria-label="Primary">
        {Object.entries(NAV_ORDER).map(([path, order]) => {
          const active = navPath === path;
          return (
            <MobileLink
              key={path}
              to={path}
              end={path === "/"}
              aria-label={NAV_LABELS[path]}
              className={active ? "active" : ""}
            >
              {/* A short bar on the top rule marks the current page and slides between items. */}
              {active && (
                <ActiveMark
                  layoutId="mobile-nav-active"
                  transition={{ duration: 0.45, ease: [0.645, 0.045, 0.355, 1] }}
                />
              )}
              <span className="num" aria-hidden="true">{`00${order}`}</span>
              <span className="label" aria-hidden="true">
                {path === "/" ? "home" : path.slice(1)}
              </span>
            </MobileLink>
          );
        })}
      </MobileNav>
    </>
  );
};

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  pointer-events: none;
  z-index: 100;
  font-family: "Kodchasan", sans-serif;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const NavSection = styled.div`
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
  border-left: 1px solid #000;
`;

const NavLink = styled(motion(Link))`
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
  transition: background-color 0.3s ease 0.2s, color 0.3s ease 0.2s;

  .num,
  .label,
  .logo {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .num {
    font-size: 0.83rem;
    font-weight: 700;
    letter-spacing: 3px;
  }

  .label {
    font-size: 1rem;
    font-weight: 700;
  }

  .logo {
    width: 25px;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1),
      filter 0.3s ease 0.2s;
  }

  @media (hover: hover) {
    &:hover {
      .num,
      .label,
      .logo {
        transform: translate3d(0, -1rem, 0);
      }
    }
  }

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: -8px;
  }

  &.active {
    background: #000;
    color: #F8F7F4;
    .logo {
      filter: invert(1);
    }
  }
`;

// Light phone bar: the strips' numbers and lowercase labels on one line,
// with a sliding mark on the top rule for the current page.
const MobileNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(60px + env(safe-area-inset-bottom));
  padding: 0 0.5rem env(safe-area-inset-bottom);
  box-sizing: border-box;
  background: rgba(248, 247, 244, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid #000;
  z-index: 100;
  font-family: "Kodchasan", sans-serif;

  @media screen and (max-width: 992px) {
    display: flex;
  }
`;

const MobileLink = styled(Link)`
  position: relative;
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  color: rgba(0, 0, 0, 0.42);
  text-decoration: none;
  transition: color 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  .num {
    font-size: 0.625rem;
    font-weight: 700;
    letter-spacing: 1px;
  }

  .label {
    font-size: 0.9375rem;
    font-weight: 700;
  }

  &.active {
    color: #000;
  }

  &:focus-visible {
    outline: 2px solid #000;
    outline-offset: -6px;
  }
`;

const ActiveMark = styled(motion.span)`
  position: absolute;
  top: -1px;
  left: 22%;
  right: 22%;
  height: 3px;
  background: #000;
`;

export default NavBar;
