import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MetaTags } from "../SEO/MetaTags";

const NotFound: React.FC = () => (
  <>
    <MetaTags
      title="404 | Page Not Found | Talade"
      description="The page you're looking for doesn't exist. Let's get you back on track."
    />
    <Container>
      <Title>404</Title>
      <Message>Page not found</Message>
      <StyledLink to="/">Return Home</StyledLink>
    </Container>
  </>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Title = styled.h1`
  font-size: 6rem;
  margin: 0;
`;

const Message = styled.p`
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const StyledLink = styled(Link)`
  color: black;
  text-decoration: underline;
  font-size: 1.2rem;

  &:hover {
    opacity: 0.8;
  }
`;

export default NotFound;
