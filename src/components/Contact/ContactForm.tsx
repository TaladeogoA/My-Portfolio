import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import styled from "styled-components";
import { INK, MUTED, pillStyles } from "../Common/theme";

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
  gap: 1.5rem;
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
  gap: 0.125rem;
`;

const Label = styled.label`
  font-size: 0.9375rem;
  color: ${MUTED};
`;

// Ruled fields, like the rows beside the form: just a line under each one,
// which turns ink and thickens on focus.
const Field = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0 0.625rem;
  font: inherit;
  font-size: 1.125rem;
  color: ${INK};
  background: transparent;
  border: 0;
  border-bottom: 1px solid #c9c5bc;
  border-radius: 0;
  box-shadow: inset 0 -1px 0 transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  @media (hover: hover) {
    &:hover {
      border-bottom-color: ${MUTED};
    }
  }

  /* Shorter on short windows so the Contact page fits without scrolling. */
  &:is(textarea) {
    resize: none;
    height: clamp(5.5rem, 18vh, 10rem);
    min-height: 5.5rem;
    line-height: 1.5;
  }

  &:focus {
    outline: none;
    border-bottom-color: ${INK};
    box-shadow: inset 0 -1px 0 ${INK};
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
