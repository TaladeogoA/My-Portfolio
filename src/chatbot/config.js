import { createChatBotMessage } from "react-chatbot-kit";
import TaladeAvatar from "../assets/talade-avatar.jpg";
import ChatOptions from "./ChatOptions";
import styled from "styled-components";
import Experience from "./userReplies/Experience";
import Inspiration from "./userReplies/Inspiration";
import Contact from "./userReplies/Contact";
import FunFact from "./userReplies/FunFact";
import Hi from "./userReplies/Hi";
import Technologies from "./userReplies/Technologies";

const botName = "Táláde Bot";

const config = {
  initialMessages: [
    createChatBotMessage(`👋 Hey there! I'm ${botName}!`),
    createChatBotMessage("Your personal guide to all things 'Talade' 😄"),
    createChatBotMessage("What would you like to know about me?", {
      widget: "chatOptions",
    }),
  ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#000",
    },
    chatButton: {
      backgroundColor: "#000",
    },
  },
  customComponents: {
    botAvatar: () => <AvatarImage src={TaladeAvatar} alt="Your Name" />,
  },
  widgets: [
    {
      widgetName: "chatOptions",
      widgetFunc: (props) => <ChatOptions {...props} />,
    },
  ],
  customMessages: {
    UserMessage: (props) => <Experience {...props} />,
    Inspiration: (props) => <Inspiration {...props} />,
    Contact: (props) => <Contact {...props} />,
    FunFact: (props) => <FunFact {...props} />,
    Hi: (props) => <Hi {...props} />,
    Technologies: (props) => <Technologies {...props} />,
  },
};

export default config;

const AvatarImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
