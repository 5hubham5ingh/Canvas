import React from "react";
import Form from "./Form";

function LogIn(prop) {
  const props = { ...prop, type: "logIn" };
  return <Form {...props} />;
}

export default LogIn;
