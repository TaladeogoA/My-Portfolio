import React from "react";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../../assets/logo.png";

const NavBar = () => {
  return (
    <Nav>
      <NavLink to="/contact">
        <h5>004</h5>
        <h3>Contact</h3>
      </NavLink>
      <NavLink to="/works">
        <h5>003</h5>
        <h3>Works</h3>
      </NavLink>
      <NavLink to="/about">
        <h5>002</h5>
        <h3>About</h3>
      </NavLink>
      <NavLink to="/">
        <h5>001</h5>
        <img className="logo" src={Logo} alt="Logo" />
        <h3>Home</h3>
      </NavLink>
    </Nav>
  );
};

export default NavBar;

const Nav = styled.nav`
  display: flex;
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
`;
