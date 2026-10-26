import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { HOVER, INK, LINE, LinkIcon, MUTED } from "../Common/theme";
import { VisuallyHidden } from "../Common/VisuallyHidden";
import { MetaTags } from "../SEO/MetaTags";
import ContactForm from "./ContactForm";

const EMAIL = "ataladeogo@gmail.com";

const LINKS = [
  {
    label: "LinkedIn",
    value: "Taladeogo Abraham",
    href: "https://www.linkedin.com/in/taladeogo-abraham-b058b1166/",
  },
  {
    label: "GitHub",
    value: "TaladeogoA",
    href: "https://github.com/TaladeogoA",
  },
];

const ContactContent = () => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the mailto link still works.
    }
  };

  return (
    <>
      <MetaTags
        title="Contact | Talade"
        description="Get in touch to discuss your next project or explore collaboration opportunities."
      />
      <Page>
        <Header>
          <Title>Contact</Title>
          <Lede>
            Don't be a stranger. Email is the fastest way to reach me, or send
            a message here.
          </Lede>
        </Header>

        <Columns>
          <section aria-labelledby="contact-direct">
            <SectionTitle id="contact-direct">Reach me directly</SectionTitle>
            <Rows>
              <EmailRow>
                <a href={`mailto:${EMAIL}`}>
                  <span className="label">Email</span>
                  <span className="value">{EMAIL}</span>
                </a>
                <CopyButton type="button" onClick={copyEmail}>
                  {copied ? "Copied" : "Copy"}
                  <VisuallyHidden> email address</VisuallyHidden>
                </CopyButton>
              </EmailRow>
              {LINKS.map((link) => (
                <LinkRow
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>
                    <span className="label">{link.label}</span>
                    <span className="value">{link.value}</span>
                  </span>
                  <RowIcon>
                    <LinkIcon />
                  </RowIcon>
                  <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
                </LinkRow>
              ))}
            </Rows>
            <VisuallyHidden role="status" aria-live="polite">
              {copied ? "Email address copied" : ""}
            </VisuallyHidden>
          </section>

          <section aria-labelledby="contact-form">
            <SectionTitle id="contact-form">Send a message</SectionTitle>
            <ContactForm />
          </section>
        </Columns>
      </Page>
    </>
  );
};

export default ContactContent;

const Page = styled.div`
  align-self: flex-start;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 6rem 4rem;
  box-sizing: border-box;
  color: ${INK};
  display: flex;
  flex-direction: column;
  gap: 4rem;

  @media (max-width: 992px) {
    padding: 3rem 1.5rem;
    gap: 2.5rem;
  }
`;

const Header = styled.header`
  max-width: 600px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 4rem;
  line-height: 1;
  font-weight: 600;
  letter-spacing: -0.03em;

  @media (max-width: 992px) {
    font-size: 3rem;
  }
`;

const Lede = styled.p`
  margin: 1rem 0 0;
  font-size: 1.3125rem;
  line-height: 1.5;
  color: ${MUTED};
  text-wrap: pretty;

  @media (max-width: 992px) {
    font-size: 1.125rem;
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
  gap: 5rem;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 3rem;
  }
`;

const SectionTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 1.0625rem;
  font-weight: 600;
`;

const Rows = styled.div`
  border-top: 1px solid ${LINE};

  .label {
    display: block;
    font-size: 0.875rem;
    color: ${MUTED};
  }

  .value {
    display: block;
    margin-top: 0.25rem;
    font-size: 1.125rem;
    font-weight: 500;
    overflow-wrap: anywhere;
  }
`;

const EmailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.125rem 0;
  border-bottom: 1px solid ${LINE};

  a {
    min-width: 0;
    color: ${INK};
    text-decoration: none;
  }

  @media (hover: hover) {
    a:hover .value {
      text-decoration: underline;
      text-underline-offset: 4px;
    }
  }
`;

const CopyButton = styled.button`
  flex-shrink: 0;
  min-height: 40px;
  min-width: 72px;
  padding: 0 0.875rem;
  font: inherit;
  font-size: 0.875rem;
  color: ${INK};
  background: transparent;
  border: 1px solid #d6d3cc;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease;

  @media (hover: hover) {
    &:hover {
      background: ${HOVER};
    }
  }

  &:focus-visible {
    outline: 2px solid ${INK};
    outline-offset: 2px;
  }
`;

const RowIcon = styled.span`
  display: inline-flex;
  font-size: 1.125rem;
  color: ${MUTED};
`;

const LinkRow = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.125rem 0.75rem;
  margin: 0 -0.75rem;
  border-bottom: 1px solid ${LINE};
  border-radius: 4px;
  color: ${INK};
  text-decoration: none;
  font-size: 1.125rem;
  transition: background 0.2s ease;

  @media (hover: hover) {
    &:hover {
      background: ${HOVER};
    }

    &:hover ${RowIcon} {
      color: ${INK};
    }
  }

  &:focus-visible {
    outline: 2px solid ${INK};
    outline-offset: -2px;
  }

  @media (max-width: 992px) {
    padding: 1.125rem 0;
    margin: 0;
  }
`;
