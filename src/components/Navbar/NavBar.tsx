import { AnimatePresence } from "framer-motion";
import React, { useCallback, useState } from "react";
import { NavLink as Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
// @ts-ignore
import Logo from "../../assets/logo.png";
import LoaderIcon from "./LoaderIcon";

const NAV_ORDER = {
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentOrder =
    NAV_ORDER[location.pathname as keyof typeof NAV_ORDER] || 1;

  const handleNavigation = useCallback(
    (to: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsLoading(true);
      navigate(to);
      const timer = setTimeout(() => setIsLoading(false), 700);
      return () => clearTimeout(timer);
    },
    [navigate]
  );

  return (
    <>
      <AnimatePresence>{isLoading && <LoaderIcon />}</AnimatePresence>
      <Navigation>
        <LeftNav>
          {Object.entries(NAV_ORDER)
            .filter(([_, order]) => order > currentOrder)
            .sort((a, b) => b[1] - a[1]) // Sort in descending order for left side
            .map(([path, order]) => (
              <NavLink
                key={path}
                to={path}
                onClick={handleNavigation(path)}
                $order={order}
                $currentOrder={currentOrder}
              >
                <h5>{`00${order}`}</h5>
                <h3>{path.slice(1)}</h3>
              </NavLink>
            ))}
        </LeftNav>

        <RightNav>
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
              >
                <h5>{`00${order}`}</h5>
                {path === "/" ? (
                  <img className="logo" src={Logo} alt="Logo" />
                ) : (
                  <h3>{path.slice(1)}</h3>
                )}
              </NavLink>
            ))}
        </RightNav>
      </Navigation>

      <MobileNav>
        {Object.entries(NAV_ORDER)
          .reverse()
          .map(([path, order]) => (
            <MobileLink key={path} to={path} onClick={handleNavigation(path)}>
              <p>{`00${order}`}</p>
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

const NavLink = styled(Link)<NavLinkStyleProps>`
  height: 100%;
  width: 50px;
  border-right: 1px solid #000;
  writing-mode: vertical-lr;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  background-color: #fff;
  color: #000;
  padding: 2rem 0;
  cursor: pointer;
  transition: transform 0.5s ease;

  h5 {
    letter-spacing: 3px;
  }

  .logo {
    width: 25px;
  }

  &:hover {
    padding-bottom: 3rem;
  }

  &.active {
    background: #000;
    color: #fff;
    .logo {
      filter: invert(1);
    }
  }
`;

const MobileNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  background-color: black;
  color: #fff;
  border-radius: 1rem;
  z-index: 100;

  @media screen and (max-width: 992px) {
    display: flex;
  }
`;

const MobileLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: #fff;
  text-align: center;
  padding: 1rem;

  p {
    margin: 0;
    &.text {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }

  &:active {
    .text {
      font-weight: 400;
      text-decoration: underline;
    }
  }
`;

export default NavBar;
