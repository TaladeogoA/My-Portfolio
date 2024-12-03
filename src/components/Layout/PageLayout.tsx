import { ReactNode } from "react";
import styled from "styled-components";
import NavBar from "../Navbar/NavBar";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <LayoutGrid>
      <NavSection>
        <NavBar />
      </NavSection>
      <MainContent>{children}</MainContent>
    </LayoutGrid>
  );
};

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const NavSection = styled.div`
  @media screen and (max-width: 992px) {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: auto;

  @media screen and (max-width: 992px) {
    padding-bottom: 5rem; // Account for mobile nav
  }
`;

export default PageLayout;
