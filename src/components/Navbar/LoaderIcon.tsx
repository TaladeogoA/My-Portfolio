import { motion } from "framer-motion";
import styled from "styled-components";

const LoaderIcon = () => (
  <LoaderContainer
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Spinner
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </LoaderContainer>
);

const LoaderContainer = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Spinner = styled(motion.div)`
  width: 60px;
  height: 60px;
  border: 3px solid black;
  border-radius: 50%;
  border-top-color: #fff;
`;

export default LoaderIcon;
