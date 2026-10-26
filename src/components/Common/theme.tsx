import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

/** Shared colours for the page content. The nav keeps its own #000 / #F8F7F4. */
export const INK = "#111110";
export const MUTED = "#5F5E5A";
export const LINE = "#E2E0DA";
export const HOVER = "#F0EEE9";
export const PAPER = "#F8F7F4";

/** Rounded black call-to-action, used for links and buttons alike. */
export const pillStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  min-height: 48px;
  padding: 0 1.375rem;
  border: 0;
  border-radius: 999px;
  background: ${INK};
  color: ${PAPER};
  font: inherit;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  @media (hover: hover) {
    &:hover {
      color: ${PAPER};
    }
  }

  &:focus-visible {
    outline: 2px solid ${INK};
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PillLink = styled(Link)`
  ${pillStyles}
`;

/** Plain underlined text link that sits next to a pill. */
export const quietLinkStyles = css`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  color: ${INK};
  font-size: 1rem;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
  gap: 0.375rem;

  @media (hover: hover) {
    &:hover {
      color: ${MUTED};
    }
  }
`;

/** Chain-link icon for links that leave the page. Sized to the text. */
export const LinkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    style={{ flexShrink: 0, verticalAlign: "-0.125em" }}
  >
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
  </svg>
);

/**
 * The site's arrow: a long thin shaft with two barbs that curve back. Sized by font-size
 * (1.4em wide). When the link or button around it is hovered, it slides out to
 * the right while a second copy slides in from the left.
 */
export const ArrowIcon = ({ direction = "right" }: { direction?: "right" | "left" }) => (
  <ArrowWrap aria-hidden="true" $left={direction === "left"}>
    <svg viewBox="0 0 28 16">
      <path d="M1.5 8h25M26.5 8c-3.4-.7-6.2-2.7-7.6-6M26.5 8c-3.4.7-6.2 2.7-7.6 6" />
    </svg>
    <svg viewBox="0 0 28 16">
      <path d="M1.5 8h25M26.5 8c-3.4-.7-6.2-2.7-7.6-6M26.5 8c-3.4.7-6.2 2.7-7.6 6" />
    </svg>
  </ArrowWrap>
);

const ArrowWrap = styled.span<{ $left: boolean }>`
  position: relative;
  display: inline-block;
  flex-shrink: 0;
  width: 1.4em;
  height: 0.8em;
  overflow: hidden;
  ${({ $left }) => $left && "transform: scaleX(-1);"}

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  }

  svg + svg {
    transform: translateX(-115%);
  }

  @media (hover: hover) {
    a:hover &,
    button:hover:not(:disabled) & {
      svg:first-child {
        transform: translateX(115%);
      }
      svg + svg {
        transform: translateX(0);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    svg {
      transition: none;
    }
  }
`;
