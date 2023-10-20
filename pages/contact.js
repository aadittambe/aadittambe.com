import React from "react";
import Contact from "../src/components/Contact";

const ContactPage = (props) => {
  const { data } = props;
  return <Contact data={data} />;
};

export default ContactPage;
