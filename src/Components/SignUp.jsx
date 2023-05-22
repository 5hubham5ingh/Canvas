import React from "react";
import Form from "./Form";

function SignUp(prop) {
  const props = {
    ...prop,
    type: "SignUp",
  };
  return <Form {...props} />;
}

export default SignUp;
