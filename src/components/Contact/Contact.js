import React from "react";
import gsap from "gsap";
import PageTransition from "../SpecialEffects/PageTransition";
import ContactContent from "./ContactContent";

const Contact = () => {
  const contact = gsap.timeline();

  return (
    <div>
      <PageTransition timeline={contact} />
      <ContactContent />
    </div>
  );
};

export default Contact;
