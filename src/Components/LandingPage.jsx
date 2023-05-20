import React, { useRef } from "react";
import Background from "./Background";
import Appbar from "./Appbar";
import LogIn from "./LogIn";

function LandingPage() {
  const logInRef = useRef();
  const appBarProps = {
    logIn: logInRef,
  };
  return (
    <div>
      <Appbar {...appBarProps} />

      <Background />
      <LogIn ref={logInRef} />
    </div>
  );
}

export default LandingPage;
