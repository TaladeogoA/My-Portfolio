import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useTransitionState } from "../../hooks/useTransitionState";

const TransitionLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { shouldAnimate, key } = useTransitionState();

  return (
    <>
      <AnimatePresence mode="wait">
        <PageContent
          key={`content-${key}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.3,
          }}
        >
          {children}
        </PageContent>
      </AnimatePresence>
    </>
  );
};

const PageContent = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

export default TransitionLayout;
