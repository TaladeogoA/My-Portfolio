import React from "react";
import styled from "styled-components";
import { RiDoubleQuotesL, RiDoubleQuotesR } from "react-icons/ri";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const AboutContent = () => {
  return (
    <main className="container">
      <AboutContainerOne>
        <p>
          {/* <Quote>
            <FaQuoteLeft className="quote" />
          </Quote> */}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa numquam
          porro dignissimos molestiae distinctio sapiente magni esse vero eos
          corrupti.
          {/* <Quote>
            <FaQuoteRight className="quote" />
          </Quote> */}
        </p>
      </AboutContainerOne>
      <AboutContainerTwo>
        <p>
          {/* <Quote>
            <FaQuoteRight className="quote" />
          </Quote> */}
          I dabbled into graphics designing, where I discovered I was great at
          illustration and color composition, and then I moved to User Interface
          Design. I loved it and I wished I could build the apps I was designing
          so I decided to learn how to. I stumbled into web development with
          Javascript and its frameworks and I discovered I could combine all the
          things I love. Over the past year I have built e-commerce sites,
          landing pages, a chrome extension and other interesting projects.
          {/* <Quote>
            <FaQuoteRight className="quote" />
          </Quote> */}
        </p>
      </AboutContainerTwo>

      <div>
        <h2>Here's some of the tools I've worked with:</h2>
        <ul></ul>
      </div>
    </main>
  );
};

export default AboutContent;

const AboutContainerOne = styled.article`
  width: 60%;
  position: relative;
  left: -6rem;
  top: -8rem;
  line-height: 1.5rem;
  font-family: "Mate", serif;
`;

const AboutContainerTwo = styled.article`
  width: 80%;
  position: relative;
  left: 15rem;
  top: -6rem;
  text-align: right;
  line-height: 1.5rem;
  font-family: "Mate", serif;
`;

const Quote = styled.span`
  margin: 0 1rem;
`;
