import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { useTransitionState } from "../../hooks/useTransitionState.ts";

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
            delay: 0.5,
          }}
        >
          {children}
        </PageContent>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {shouldAnimate && (
          <Overlay
            key={`overlay-${key}`}
            initial={{ scaleX: 0, transformOrigin: "left" }}
            animate={{ scaleX: [0, 1, 1, 0] }}
            exit={{ scaleX: 0 }}
            transition={{
              duration: 1,
              ease: [0.645, 0.045, 0.355, 1],
              times: [0, 0.4, 0.6, 1],
            }}
          >
            <TransitionText
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              TÁLÁDEÓGÓ
            </TransitionText>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
};

const PageContent = styled(motion.div)`
  width: 100%;
  height: 100%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  z-index: 999;
  pointer-events: none;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TransitionText = styled(motion.div)`
  color: white;
  font-size: 4rem;
  font-weight: bold;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  will-change: transform, opacity;

  @media (max-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 0.3em;
  }
`;

export default TransitionLayout;
