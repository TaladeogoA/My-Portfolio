import React, { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import styled from "styled-components";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { H2, Text } from "../Common/Typography";

interface SplitViewSliderProps {
  storyContent: {
    description: string;
    highlights: string[];
  };
  devContent: {
    description: string;
    highlights: string[];
  };
}

const SplitViewSlider: React.FC<SplitViewSliderProps> = ({
  storyContent,
  devContent,
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [currentView, setCurrentView] = useState<"story" | "dev">("story");

  if (isMobile) {
    return (
      <MobileContainer>
        <MobileToggle>
          <ToggleButton
            isActive={currentView === "story"}
            onClick={() => setCurrentView("story")}
          >
            <Text>Less Jargon</Text>
          </ToggleButton>
          <ToggleButton
            isActive={currentView === "dev"}
            onClick={() => setCurrentView("dev")}
          >
            <Text>More Jargon</Text>
          </ToggleButton>
        </MobileToggle>

        {currentView === "story" ? (
          <MobileContent>
            <Text>{storyContent.description}</Text>
            <HighlightsList>
              {storyContent.highlights.map((highlight, index) => (
                <li key={index}>
                  <Text>{highlight}</Text>
                </li>
              ))}
            </HighlightsList>
          </MobileContent>
        ) : (
          <MobileDevContent>
            <Text>{devContent.description}</Text>
            <HighlightsList>
              {devContent.highlights.map((highlight, index) => (
                <li key={index}>
                  <Text>{highlight}</Text>
                </li>
              ))}
            </HighlightsList>
          </MobileDevContent>
        )}
      </MobileContainer>
    );
  }

  return (
    <Container>
      <PanelGroup direction="vertical">
        <Panel defaultSize={50} minSize={20}>
          <StoryPanel>
            <PanelContent>
              <H2>Story Mode</H2>
              <Text>{storyContent.description}</Text>
              <HighlightsList>
                {storyContent.highlights.map((highlight, index) => (
                  <li key={index}>
                    <Text>{highlight}</Text>
                  </li>
                ))}
              </HighlightsList>
            </PanelContent>
          </StoryPanel>
        </Panel>

        <ResizeHandle>
          <DividerLabel>
            <Text>Less Jargon ↑ ↓ More Jargon</Text>
          </DividerLabel>
        </ResizeHandle>

        <Panel defaultSize={50} minSize={20}>
          <DevPanel>
            <PanelContent>
              <H2>Dev Mode</H2>
              <Text>{devContent.description}</Text>
              <HighlightsList>
                {devContent.highlights.map((highlight, index) => (
                  <li key={index}>
                    <Text>{highlight}</Text>
                  </li>
                ))}
              </HighlightsList>
            </PanelContent>
          </DevPanel>
        </Panel>
      </PanelGroup>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const StoryPanel = styled.div`
  height: 100%;
  background: #fafafa;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const DevPanel = styled.div`
  height: 100%;
  background: #000;
  color: #fff;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${H2}, ${Text} {
    color: #fff;
  }
`;

const PanelContent = styled.div`
  padding: 2rem;
`;

const ResizeHandle = styled(PanelResizeHandle)`
  height: 40px;
  background: linear-gradient(
    to bottom,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(0, 0, 0, 0.95) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 2px solid #000;
  border-bottom: 2px solid #000;
  cursor: row-resize;
  transition: all 0.2s ease;
  position: relative;
  z-index: 10;

  &:hover {
    height: 50px;
  }

  &:active {
    cursor: row-resize;
  }
`;

const DividerLabel = styled.div`
  background: #fff;
  padding: 0.25rem 1rem;
  border-radius: 20px;
  border: 1px solid #000;
  font-size: 0.75rem;
  font-weight: 500;
  user-select: none;
  pointer-events: none;
`;

const HighlightsList = styled.ul`
  margin-top: 1.5rem;
  padding-left: 1.5rem;

  li {
    margin-bottom: 0.75rem;
  }
`;

const MobileContainer = styled.div`
  padding: 1rem;
`;

const MobileToggle = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  border: 1px solid #000;
  border-radius: 8px;
  overflow: hidden;
`;

const ToggleButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 0.75rem;
  background: ${({ isActive }) => (isActive ? "#000" : "#fff")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  ${Text} {
    color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  }

  &:hover {
    opacity: 0.8;
  }
`;

const MobileContent = styled.div`
  padding: 1rem 0;
`;

const MobileDevContent = styled.div`
  padding: 1.5rem;
  background: #000;
  border-radius: 8px;
  margin-top: 1rem;

  ${Text} {
    color: #fff;
  }
`;

export default SplitViewSlider;