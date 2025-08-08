import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostContent from "../../blog/startups-cured-procrastination.mdx";

const StartupPostPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        {/* Basic HTML metadata */}
        <title>How Startups Cured My Procrastination | Taladeogo</title>
        <meta
          name="description"
          content="Discover how working in startups transformed my productivity habits, taught me urgency, and reshaped my approach to goals."
        />

        {/* Open Graph for Facebook, LinkedIn, etc */}
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content="How Startups Cured My Procrastination"
        />
        <meta
          property="og:description"
          content="How startup culture pushed me past procrastination and taught me urgency in life and work."
        />
        <meta
          property="og:image"
          content="https://talade.tech/images/startups-procrastination-cover.png"
        />
        <meta
          property="og:url"
          content="https://talade.tech/blog/startups-cured-my-procrastination"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="How Startups Cured My Procrastination"
        />
        <meta
          name="twitter:description"
          content="How startup culture pushed me past procrastination and taught me urgency in life and work."
        />
        <meta
          name="twitter:image"
          content="https://talade.tech/images/startups-procrastination-cover.jpg"
        />
      </Helmet>

      <Container>
        <BackButton onClick={() => navigate("/")}>← Back</BackButton>
        <Article>
          <PostContent />
        </Article>
      </Container>
    </>
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
