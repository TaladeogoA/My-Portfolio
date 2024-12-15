import { ReactNode } from "react";
import styled from "styled-components";
import { useNavPadding } from "../../hooks/useNavPadding";
import NavBar from "../Navbar/NavBar";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { left, right } = useNavPadding();

  return (
    <LayoutGrid>
      <NavSection>
        <NavBar />
      </NavSection>
      <MainContent $leftPadding={left} $rightPadding={right}>
        {children}
      </MainContent>
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

const MainContent = styled.main<{
  $leftPadding: number;
  $rightPadding: number;
}>`
  padding-left: ${({ $leftPadding }) => $leftPadding}px;
  padding-right: ${({ $rightPadding }) => $rightPadding}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow: auto;
  transition: padding 0.5s ease;

  @media screen and (max-width: 992px) {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 60px;
  }
`;

export default PageLayout;
