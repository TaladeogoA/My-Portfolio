import React from "react";
import { createCustomMessage } from "react-chatbot-kit";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleWorkExperience = (prevMsgs) => {
    const newMessages = [
      ...prevMsgs,
      createCustomMessage("test", "UserMessage"),
      createChatBotMessage(
        "I've been working as a frontend developer in the health tech field for about a year now. My job has been all about improving hospital management and payment software.",

        {
          withAvatar: true,
        }
      ),
      createChatBotMessage(
        "I've used Next.js and Chakra UI, along with other tools, to make the user experience more user-friendly. In fact, we managed to cut billing errors by 20% and got payments in on time, boosting it by 30%."
      ),
      createChatBotMessage(
        "I'm currently working on a side project, developing a learning management system where organizations can upload courses, manage students, and enable students to access and track their learning progress within their organization."
      ),
      createChatBotMessage("Can I help you with anything else?", {
        widget: "chatOptions",
      }),
    ];

    setState((prev) => ({
      ...prev,
      messages: newMessages,
    }));
  };

  const handleInspiration = (prevMsgs) => {
    const botMessage = createChatBotMessage(
      "I was inspired to become a frontend developer because I love the idea of being able to bring ideas to life on the web. I also enjoy the problem-solving aspect of coding.",
      {
        withAvatar: true,
      }
    );

    const newMessages = [
      ...prevMsgs,
      createCustomMessage("test", "Inspiration"),
      botMessage,
      createChatBotMessage("Can I help you with anything else?", {
        widget: "chatOptions",
      }),
    ];

    setState((prev) => ({
      ...prev,
      messages: newMessages,
    }));
  };

  const handleTechnologies = (prevMsgs) => {
    const botMessage = createChatBotMessage(
      "I am proficient in HTML, CSS, JavaScript, React, and Node.js. I also have experience with MongoDB, Express, and Python.",
      {
        withAvatar: true,
      }
    );

    const newMessages = [
      ...prevMsgs,
      createCustomMessage("test", "Technologies"),
      botMessage,
      createChatBotMessage("Can I help you with anything else?", {
        widget: "chatOptions",
      }),
    ];

    setState((prev) => ({
      ...prev,
      messages: newMessages,
    }));
  };

  const handleContact = (prevMsgs) => {
    const botMessage = createChatBotMessage(
      "You can send me an email at  ataladeogo@gmal.com",
      {
        withAvatar: true,
      }
    );

    const newMessages = [
      ...prevMsgs,
      createCustomMessage("test", "Contact"),
      botMessage,
      createChatBotMessage("Can I help you with anything else?", {
        widget: "chatOptions",
      }),
    ];

    setState((prev) => ({
      ...prev,
      messages: newMessages,
    }));
  };

  const handleFunFact = (prevMsgs) => {
    const botMessage = createChatBotMessage(
      "I love to cook and I'm a huge fan of the NBA!",
      {
        withAvatar: true,
      }
    );

    const newMessages = [
      ...prevMsgs,
      createCustomMessage("test", "FunFact"),
      botMessage,
      createChatBotMessage("Can I help you with anything else?", {
        widget: "chatOptions",
      }),
    ];

    setState((prev) => ({
      ...prev,
      messages: newMessages,
    }));
  };

  const handleHi = (prevMsgs) => {
    const botMessage = createChatBotMessage("Hi back at you!");

    const newMessages = [
      ...prevMsgs,
      createCustomMessage("test", "Hi"),
      botMessage,
      createChatBotMessage("Can I help you with anything else?", {
        widget: "chatOptions",
      }),
    ];

    setState((prev) => ({
      ...prev,
      messages: newMessages,
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleWorkExperience,
            handleInspiration,
            handleTechnologies,
            handleContact,
            handleFunFact,
            handleHi,
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
