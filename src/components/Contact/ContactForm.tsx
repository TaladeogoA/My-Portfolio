import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "../Common/Button";
import { Text } from "../Common/Typography";

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
      <FormGroup>
        <Label htmlFor="name">Name</Label>
        <Input
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
        <Input
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

      <FormGroup>
        <Label htmlFor="message">Message</Label>
        <TextArea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          required
          rows={5}
        />
      </FormGroup>

      <Actions>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Message"}
        </Button>
      </Actions>

      <div role="status" aria-live="polite">
        {status === "success" && (
          <Text $color="#1a6b2f" $margin="0">
            Message sent successfully!
          </Text>
        )}
        {status === "error" && (
          <Text $color="#b00020" $margin="0">
            Failed to send message. Please try again, or email me directly at
            ataladeogo@gmail.com.
          </Text>
        )}
      </div>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Actions = styled.div`
  display: flex;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem 0;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 1.2rem;
  font-family: inherit;
  background: transparent;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 0 0 #000;
  }
`;

const TextArea = styled.textarea`
  padding: 0.8rem 0;
  border: none;
  border-bottom: 1px solid #000;
  font-size: 1.2rem;
  font-family: inherit;
  resize: vertical;
  background: transparent;
  transition: border-color 0.3s ease;
  height: 100px;

  &:focus {
    outline: none;
    background: rgba(0, 0, 0, 0.04);
    box-shadow: 0 1px 0 0 #000;
  }
`;

export default ContactForm;
