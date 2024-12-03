import styled from "styled-components";

const ChatOptions = (props) => {
  const options = [
    {
      text: "Tell me about your work experience.",
      handler: () =>
        props.actionProvider.handleWorkExperience(props.state.messages),
      id: 1,
    },
    {
      text: "What inspired you to become a frontend developer?",
      handler: () =>
        props.actionProvider.handleInspiration(props.state.messages),
      id: 2,
    },
    {
      text: "What technologies are you proficient in?",
      handler: () =>
        props.actionProvider.handleTechnologies(props.state.messages),
      id: 3,
    },

    {
      text: "How can I contact you?",
      handler: () => props.actionProvider.handleContact(props.state.messages),
      id: 4,
    },

    {
      text: "Tell me a fun fact about yourself.",
      handler: () => props.actionProvider.handleFunFact(props.state.messages),
      id: 5,
    },
    {
      text: "Just saying hi!",
      handler: () => props.actionProvider.handleHi(props.state.messages),
      id: 6,
    },
  ];

  return (
    <OptionsContainer>
      {options.map((option) => (
        <OptionButton key={option.text} onClick={option.handler}>
          {option.text}
        </OptionButton>
      ))}
    </OptionsContainer>
  );
};

export default ChatOptions;

const OptionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1rem;
`;

const OptionButton = styled.button`
  background-color: #fff;
  width: max-content;
  border: solid 1px #000;
  color: #000;
  cursor: pointer;
  margin: 5px;
  padding: 10px;
  border-radius: 5px;
`;
