import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostContent from "../../blog/startups-cured-procrastination.mdx";

const StartupPostPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <BackButton onClick={() => navigate("/")}>← Back</BackButton>
            <Article>
                <PostContent />
            </Article>
        </Container>
    );
};

export default StartupPostPage;

const Container = styled.div`
  max-width: 740px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: "Georgia", "Times New Roman", serif;
  color: #242424;
  line-height: 1.8;
  min-height: 100vh;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #000;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 2rem;
  padding: 0;
  text-decoration: underline;

  &:hover {
    opacity: 0.7;
  }
`;

const Article = styled.article`
  h1 {
    font-size: 2.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    /* margin-bottom: 1rem; */
  }
  p {
    margin: 1.5rem 0;
    font-size: 1.1rem;
  }
  em {
    color: #555;
  }
  strong {
    font-weight: bold;
  }
  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }
`;
