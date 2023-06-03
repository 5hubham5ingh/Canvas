import React from "react";
import Form from "./Form";

function LogIn(prop) {
  const props = { ...prop, type: "LogIn" };
  return <Form {...props} />;
}

export default LogIn;
