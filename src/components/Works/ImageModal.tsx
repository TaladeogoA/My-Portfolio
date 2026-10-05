import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { Asset } from "../../types/project";
import { VisuallyHidden } from "../Common/VisuallyHidden";

interface ImageModalProps {
  asset: Asset | null;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ asset, onClose }) => {
  const isOpen = asset !== null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
      } else if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [isOpen]);

  return createPortal(
    <AnimatePresence>
      {asset && (
        <Overlay
          role="dialog"
          aria-modal="true"
          aria-label={asset.alt ?? "Enlarged project image"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <CloseButton ref={closeRef} type="button" onClick={onClose}>
            <span aria-hidden="true">×</span>
            <VisuallyHidden>Close</VisuallyHidden>
          </CloseButton>
          <Content
            initial={{ scale: 0.97, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {asset.type === "video" ? (
              <ModalVideo autoPlay muted loop playsInline src={asset.url} />
            ) : (
              <ModalImage src={asset.url} alt={asset.alt ?? ""} />
            )}
          </Content>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
};

const OverlayBase = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  overscroll-behavior: contain;
  z-index: 1000;
`;

const Overlay = motion(OverlayBase);

const ContentBase = styled.div`
  max-width: 92vw;
  max-height: 88vh;
  position: relative;
  cursor: default;
`;

const Content = motion(ContentBase);

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #f8f7f4;
  color: #f8f7f4;
  font-size: 1.75rem;
  line-height: 1;

  @media (hover: hover) {
    &:hover {
      background: #f8f7f4;
      color: #000;
    }
  }

  &:focus-visible {
    outline: 2px solid #f8f7f4;
    outline-offset: 3px;
  }
`;

const ModalImage = styled.img`
  display: block;
  max-width: 100%;
  max-height: 88vh;
  object-fit: contain;
`;

const ModalVideo = styled.video`
  display: block;
  max-width: 100%;
  max-height: 88vh;
  object-fit: contain;
`;

export default ImageModal;
