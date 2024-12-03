import { AnimatePresence } from "framer-motion";
import React, { useCallback, useState } from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
// @ts-ignore
import Logo from "../../assets/logo.png";
import LoaderIcon from "./LoaderIcon.tsx";

interface NavLinkProps {
  isActive?: boolean;
}

interface MobileLinkProps {
  isActive?: boolean;
}

const NavBar: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = useCallback(
    (to: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setIsLoading(true);

      navigate(to);

      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700);

      return () => clearTimeout(timer);
    },
    [navigate]
  );

  return (
    <>
      <AnimatePresence>{isLoading && <LoaderIcon />}</AnimatePresence>

      <Nav>
        <NavLink
          className="nav-link"
          to="/contact"
          onClick={handleNavigation("/contact")}
        >
          <h5>004</h5>
          <h3>Contact</h3>
        </NavLink>
        <NavLink
          className="nav-link"
          to="/works"
          onClick={handleNavigation("/works")}
        >
          <h5>003</h5>
          <h3>Works</h3>
        </NavLink>
        <NavLink
          className="nav-link"
          to="/about"
          onClick={handleNavigation("/about")}
        >
          <h5>002</h5>
          <h3>About</h3>
        </NavLink>
        <NavLink className="nav-link" to="/" onClick={handleNavigation("/")}>
          <h5>001</h5>
          <img className="logo" src={Logo} alt="Logo" />
          <h3>Home</h3>
        </NavLink>
      </Nav>

      <MobileNav>
        <MobileLink to="/contact" onClick={handleNavigation("/contact")}>
          <p>004</p>
          <p className="text">Contact</p>
        </MobileLink>
        <MobileLink to="/works" onClick={handleNavigation("/works")}>
          <p>003</p>
          <p className="text">Works</p>
        </MobileLink>
        <MobileLink to="/about" onClick={handleNavigation("/about")}>
          <p>002</p>
          <p className="text">About</p>
        </MobileLink>
        <MobileLink to="/" onClick={handleNavigation("/")}>
          <p>001</p>
          <p className="text">Home</p>
        </MobileLink>
      </MobileNav>
    </>
  );
};

const Nav = styled.nav`
  display: flex;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const NavLink = styled(Link)<NavLinkProps>`
  height: 100vh;
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

  h5 {
    letter-spacing: 3px;
  }

  .logo {
    width: 25px;
  }

  &:hover {
    padding-bottom: 3rem;
    transition: 0.5s;
  }

  &.active {
    margin-left: auto;
    border-left: solid 1px black;
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
  left: 0;
  right: 0;
  width: 90%;
  margin: 0 auto;
  background-color: black;
  color: #fff;
  border-radius: 1rem;

  @media screen and (max-width: 992px) {
    display: flex;
  }
`;

const MobileLink = styled(Link)<MobileLinkProps>`
  width: 100%;
  text-decoration: none;
  color: #fff;

  p {
    text-align: center;

    &.text {
      font-size: 1.4rem;
      font-weight: 600;
    }
  }

  &:active {
    background-color: #000;
    color: #fff;

    .text {
      font-weight: 400;
      text-decoration: underline;
    }
  }
`;

export default NavBar;
