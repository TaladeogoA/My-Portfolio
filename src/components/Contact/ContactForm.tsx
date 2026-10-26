import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import styled from "styled-components";
import { ArrowIcon, INK, MUTED, pillStyles } from "../Common/theme";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timeZoneName: "short",
    });

    try {
      await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID!,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          timestamp: timestamp,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Pair>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Field
            id="name"
            type="text"
            autoComplete="name"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Field
            id="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </FormGroup>
      </Pair>

      <FormGroup>
        <Label htmlFor="message">Message</Label>
        <Field
          as="textarea"
          id="message"
          value={formData.message}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          required
          rows={6}
        />
      </FormGroup>

      <Actions>
        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Sending…" : "Send message"}
          {!isLoading && <ArrowIcon />}
        </SubmitButton>
        <Hint>I usually reply within a few days.</Hint>
      </Actions>

      <Status role="status" aria-live="polite">
        {status === "success" && (
          <span className="success">Message sent. Thank you!</span>
        )}
        {status === "error" && (
          <span className="error">
            Failed to send message. Please try again, or email me directly at
            ataladeogo@gmail.com.
          </span>
        )}
      </Status>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Pair = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;

  @media (max-width: 600px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.25rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.9375rem;
  font-weight: 500;
`;

const Field = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.8rem 0.875rem;
  font: inherit;
  font-size: 1.0625rem;
  color: ${INK};
  background: transparent;
  border: 1px solid #c9c5bc;
  border-radius: 8px;
  transition: border-color 0.2s ease;

  @media (hover: hover) {
    &:hover {
      border-color: ${MUTED};
    }
  }

  &:is(textarea) {
    resize: vertical;
    min-height: 140px;
  }

  &:focus {
    outline: 2px solid ${INK};
    outline-offset: 1px;
    border-color: ${INK};
  }
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const SubmitButton = styled.button`
  ${pillStyles}
`;

const Hint = styled.span`
  font-size: 0.875rem;
  color: ${MUTED};
`;

const Status = styled.div`
  font-size: 1rem;
  line-height: 1.5;

  .success {
    color: #1a6b2f;
  }

  .error {
    color: #b00020;
  }
`;

export default ContactForm;
