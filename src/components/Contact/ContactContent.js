import React from "react";
// import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import styled from "styled-components";
import config from "../../chatbot/config";
import ActionProvider from "../../chatbot/ActionProvider";
import MessageParser from "../../chatbot/MessageParser";
import { useState } from "react";
import { AiOutlineMessage, AiOutlineClose } from "react-icons/ai";
import gsap from "gsap";
import "./Chatbot.css";
import Chatbot from "./Chatbot";

const ContactContent = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    if (!chatOpen) {
      openChat();
    } else {
      closeChat();
    }
  };

  const openChat = () => {
    gsap.to(".chat-button", { rotate: 180, duration: 0.3 });
    gsap.to(".chat-container", { height: "max-content", duration: 0.3 });
    setChatOpen(true);
  };

  const closeChat = () => {
    gsap.to(".chat-button", { rotate: 0, duration: 0.3 });
    gsap.to(".chat-container", { height: "0", duration: 0.3 });
    setChatOpen(false);
  };

  return (
    <Container className="container">
      <p>
        Don't be a stranger, say hello! <br /> Send me an email at{" "}
        <a href="mailto:ataladeogo@gmail.com">ataladeogo@gmail.com</a> or reach
        out on{" "}
        <a
          href="https://www.linkedin.com/in/taladeogo/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>{" "}
        .
      </p>
      <p>
        You can also find me liking all the tweets that say what I'm thinking on{" "}
        <a
          href="https://twitter.com/taladeogo_"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Twitter
        </a>{" "}
        or documenting my learning journey on{" "}
        <a
          href="https://github.com/TaladeogoA"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        .
      </p>
      <p>I look forward to hearing from you!</p>

      <ChatbotContainer>
        <ChatButton onClick={toggleChat} className="chat-button">
          {chatOpen ? <AiOutlineClose /> : <AiOutlineMessage />}
        </ChatButton>
        {chatOpen && <Chatbot className="chat-container" />}
      </ChatbotContainer>
    </Container>
  );
};

export default ContactContent;

const Container = styled.main`
  left: 40%;

  p {
    font-size: 2rem;
    line-height: 2.5rem;
    font-weight: 400;
    font-family: "Mate", serif;
    margin-bottom: 1rem;

    a {
      color: #000;

      &:hover {
        text-decoration: none;
      }
    }
  }
`;

const ChatbotContainer = styled.div`
  height: 100%;
  background: transparent;
`;

const ChatButton = styled.button`
  position: fixed;
  bottom: -8rem;
  left: -5rem;
  background-color: #000;
  color: #fff;
  font-size: 24px;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

const ChatContainer = styled.div`
  position: absolute;
  bottom: -4rem;
  left: -3rem;
  z-index: 9999;
  width: max-content;
  height: 0;
  /* overflow-y: auto; */
  transition: height 0.1s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #c7c5c5;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a7a7;
  } */
`;
