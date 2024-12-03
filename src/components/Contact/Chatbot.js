import { useState } from "react";
import { PulseLoader } from "react-spinners";
import styled from "styled-components";
import TaladeAvatar from "../../assets/talade-avatar.jpg";

const Chatbot = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const options = [
    {
      text: "Tell me about your work experience.",
      id: 1,
      answers: [
        "I've been working as a frontend developer in the health tech field for about a year now. My job has been all about improving hospital management and payment software.",
        "I've used Next.js and Chakra UI, along with other tools, to make the user experience more user-friendly. In fact, we managed to cut billing errors by 20% and got payments in on time, boosting it by 30%.",
        "I'm currently working on a side project, developing a learning management system where organizations can upload courses, manage students, and enable students to access and track their learning progress within their organization.",
      ],
    },
    {
      text: "What inspired you to become a frontend developer?",
      id: 2,
      answers: [
        "I was inspired to become a frontend developer because I love the idea of being able to bring ideas to life on the web. I also enjoy the problem-solving aspect of coding.",
      ],
    },
    {
      text: "What technologies are you proficient in?",
      id: 3,
      answers: [
        "I am proficient in HTML, CSS, JavaScript, React, and Node.js. I also have experience with MongoDB, Express, and Python.",
      ],
    },

    {
      text: "How can I contact you?",
      id: 4,
      answers: [
        "You can contact me by email at <a href='ataladeogo@gmail.com'>ataladeogo@gmail.com</a>.",
      ],
    },

    {
      text: "Tell me a fun fact about yourself.",

      id: 5,
    },
    {
      text: "Just saying hi!",

      id: 6,
    },
  ];

  const generateBotResponses = (userInput) => {
    const selectedOption = options.find((option) => option.text === userInput);

    if (selectedOption) {
      return selectedOption?.answers.map((answer, index) => ({
        text: <div dangerouslySetInnerHTML={{ __html: answer }} key={index} />,
        type: "bot",
        key: index,
      }));
    } else {
      return "I'm sorry, I didn't quite catch that. Can you please ask again?";
    }
  };

  const handleUserInput = (optionText) => {
    setChatHistory((prevChatHistory) => [
      ...prevChatHistory,
      { text: optionText, type: "user" },
    ]);

    setIsTyping(true);

    setTimeout(() => {
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        ...generateBotResponses(optionText),
        { text: "Is there anything else I can help you with?", type: "bot" },
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <ChatContainer className="chat-container">
      <ChatHeader>
        <img src={TaladeAvatar} alt="Talade Avatar" />
        <div>
          <h4>Táláde Bot</h4>
          <p>Your personal guide to all things 'Talade' 😄</p>
        </div>
      </ChatHeader>
      <OptionsContainer>
        {options.map((option) => (
          <OptionButton
            key={option.id}
            onClick={() => handleUserInput(option.text)}
          >
            {option.text}
          </OptionButton>
        ))}
      </OptionsContainer>
      <ChatHistory>
        {chatHistory.map((message, index) =>
          message.type === "user" ? (
            <div key={index} className={message.type}>
              <div>{message.text}</div>
              {isTyping && (
                <div className="bot-typing">
                  <PulseLoader
                    color="#000"
                    margin={1}
                    size={4}
                    speedMultiplier={0.5}
                  />
                </div>
              )}
            </div>
          ) : (
            <div key={index} className={message.type}>
              {message.text}
            </div>
          )
        )}
      </ChatHistory>
    </ChatContainer>
  );
};

export default Chatbot;

const ChatContainer = styled.div`
  position: absolute;
  bottom: -4rem;
  left: -3rem;
  z-index: 9999;
  width: max-content;
  max-width: 20rem;
  transition: height 0.1s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-height: 60vh;
  overflow-y: auto;
  background-color: #fff;

  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #c7c5c5;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a7a7;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  background: #fff;
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
`;

const OptionButton = styled.button`
  font-size: 0.8rem;
  background-color: #fff;
  width: max-content;
  max-width: 100%;
  border: solid 1px #000;
  color: #000;
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
  text-align: left;
  word-wrap: break-word;
`;

const ChatHeader = styled.div`
  background: #000;
  color: #fff;
  padding: 0.6rem;
  width: 100%;

  display: flex;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 1rem;
    border: solid 2px #fff;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    h4 {
      font-size: 1rem;
      margin-bottom: 0.2rem;
    }

    p {
      font-size: 0.8rem;
      line-height: normal;
      margin-bottom: 0;
    }
  }
`;

const ChatHistory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 1rem;
  font-size: 0.8rem;
  width: 100%;

  .user {
    margin-left: auto;
    margin-right: 0.5rem;

    margin-bottom: 0.5rem;

    div:first-child {
      background: #ebe8e8;
      color: #000;
      padding: 0.5rem 0.5rem 0.5rem 1.5rem;
      width: 80%;
      word-wrap: break-word;
      margin-left: auto;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      border-radius: 5px;
    }

    .bot-typing {
      margin-left: auto;
      margin-right: 0.5rem;
      font-size: 0.8rem;
      color: #000;
      display: flex;
      justify-content: flex-end;
    }
  }

  .bot {
    background: #000;
    color: #fff;
    padding: 0.5rem 0.5rem 0.5rem 1.5rem;
    width: 80%;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    margin-right: auto;
    margin-left: 0.5rem;
  }
`;
