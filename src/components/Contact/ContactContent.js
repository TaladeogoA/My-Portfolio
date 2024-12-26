import styled from "styled-components";
import { StyledLink } from "../Common/StyledLink";
import { Text } from "../Common/Typography";
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
            <Text>
              Don't be a stranger, say hello! <br /> Send me an email at{" "}
              <StyledLink href="mailto:ataladeogo@gmail.com">
                ataladeogo@gmail.com
              </StyledLink>{" "}
              or reach out on{" "}
              <StyledLink
                href="https://www.linkedin.com/in/taladeogo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </StyledLink>{" "}
              .
            </Text>
            <Text>Or send a direct message below:</Text>
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

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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
