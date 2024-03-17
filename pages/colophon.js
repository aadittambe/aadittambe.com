import React from "react";
import Colophon from "../src/components/Colophon";

const ColophonPage = (props) => {
  const { data } = props;
  return <Colophon data={data} />;
};

export default ColophonPage;
