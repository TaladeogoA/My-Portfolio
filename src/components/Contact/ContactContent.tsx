import styled from "styled-components";
import { StyledLink } from "../Common/StyledLink";
import { H1, Text } from "../Common/Typography";
import { MetaTags } from "../SEO/MetaTags";
import ContactForm from "./ContactForm";

const ContactContent = () => {
  return (
    <>
      <MetaTags
        title="Contact | Talade"
        description="Get in touch to discuss your next project or explore collaboration opportunities."
      />
      <Container>
        <Wrapper>
          <ContentSection>
            <H1 $margin="0">Don't be a stranger, say hello!</H1>
            <Text $margin="0">
              Send me an email at{" "}
              <StyledLink href="mailto:ataladeogo@gmail.com">
                ataladeogo@gmail.com
              </StyledLink>
              , connect with me on{" "}
              <StyledLink
                href="https://www.linkedin.com/in/taladeogo-abraham-b058b1166/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </StyledLink>{" "}
              or find my code on{" "}
              <StyledLink
                href="https://github.com/TaladeogoA"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </StyledLink>
              .
            </Text>
            <Text $margin="0">Or send a direct message below:</Text>
          </ContentSection>

          <FormSection>
            <ContactForm />
          </FormSection>
        </Wrapper>
      </Container>
    </>
  );
};

export default ContactContent;

const Container = styled.div`
  min-height: 100vh;
  min-height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 1.5rem;

  @media (min-width: 769px) {
    padding: 3rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  max-width: 700px;
  width: 100%;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormSection = styled.div`
  width: 100%;
`;
