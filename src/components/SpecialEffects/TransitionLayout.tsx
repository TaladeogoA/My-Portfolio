import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getNavPath } from "../Navbar/NavBar";

const TransitionLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const key = getNavPath(useLocation().pathname);

  return (
    <AnimatePresence mode="wait">
      <PageContent
        key={`content-${key}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.25 } }}
        exit={{ opacity: 0, transition: { duration: 0.15 } }}
      >
        {children}
      </PageContent>
    </AnimatePresence>
  );
};

// Grows with the page instead of being fixed to the screen height, so tall
// pages keep the space reserved under the phone nav. As a column flexbox it
// lets a page fill the screen with flex: 1 (Home does).
const PageContentBase = styled.div`
  align-self: flex-start;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageContent = motion(PageContentBase);

export default TransitionLayout;
