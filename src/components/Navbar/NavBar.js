import React, { useEffect, useState } from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoX } from "react-icons/go";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  return (
    <>
      <Nav>
        <NavLink className="nav-link" to="/contact">
          <h5>004</h5>
          <h3>Contact</h3>
        </NavLink>
        <NavLink className="nav-link" to="/works">
          <h5>003</h5>
          <h3>Works</h3>
        </NavLink>
        <NavLink className="nav-link" to="/about">
          <h5>002</h5>
          <h3>About</h3>
        </NavLink>
        <NavLink className="nav-link" to="/">
          <h5>001</h5>
          <img className="logo" src={Logo} alt="Logo" />
          <h3>Home</h3>
        </NavLink>
      </Nav>

      <MobileNav className="mobile-nav">
        <Link to="/">
          <img className="nav-logo" src={Logo} alt="logo" />
        </Link>

        <div className={isOpen ? "nav-menu active" : "nav-menu"}>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/works">Works</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? <GoX /> : <RxHamburgerMenu />}
        </button>
      </MobileNav>
    </>
  );
};

export default NavBar;

const Nav = styled.nav`
  display: flex;

  @media screen and (max-width: 992px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
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

  @media screen and (max-width: 992px) {
  }
`;

const MobileNav = styled.nav`
  display: none;
  position: relative;

  @media screen and (max-width: 992px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    height: max-content;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

    ul {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      list-style: none;
      text-align: center;

      li {
        color: inherit;
        text-decoration: none;
      }
    }
  }
`;
