import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Asset } from "../../types/project";

interface ImageModalProps {
  asset: Asset;
  onClose: () => void;
  isOpen: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({ asset, onClose, isOpen }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Content
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {asset.type === "video" ? (
              <ModalVideo autoPlay muted loop playsInline src={asset.url} />
            ) : (
              <ModalImage src={asset.url} alt="" />
            )}
          </Content>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Content = styled(motion.div)`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
`;

const ModalImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

const ModalVideo = styled.video`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`;

export default ImageModal;
