import { ReactNode, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNavPadding } from "../../hooks/useNavPadding";
import NavBar, { getNavPath } from "../Navbar/NavBar";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const { left, right } = useNavPadding();
  const { pathname } = useLocation();
  const navPath = getNavPath(pathname);
  const mainRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const main = mainRef.current;
    if (!main) return;
    main.scrollTo({ top: 0, left: 0 });
    main.focus({ preventScroll: true });
  }, [navPath]);

  return (
    <LayoutGrid>
      <SkipLink href="#main-content">Skip to content</SkipLink>
      <NavSection>
        <NavBar />
      </NavSection>
      <MainContent
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        $leftPadding={left}
        $rightPadding={right}
      >
        {children}
      </MainContent>
    </LayoutGrid>
  );
};

const LayoutGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  overflow: hidden;

  @media screen and (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const SkipLink = styled.a`
  position: fixed;
  top: 0.75rem;
  left: 0.75rem;
  z-index: 300;
  padding: 0.6rem 1rem;
  background: #000;
  color: #f8f7f4;
  font-size: 0.9rem;
  text-decoration: none;
  transform: translateY(-200%);

  &:focus {
    transform: translateY(0);
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
  height: 100dvh;
  overflow: auto;
  transition: padding 0.5s ease;

  &:focus {
    outline: none;
  }

  @media screen and (max-width: 992px) {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: calc(60px + env(safe-area-inset-bottom));
  }
`;

export default PageLayout;
