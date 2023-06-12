import React, { useRef } from "react";
import Background from "./Background";
import Appbar from "./Appbar";

function LandingPage() {
  const logInRef = useRef();
  const appBarProps = {
    logIn: logInRef,
  };
  return (
    <div>
      <Appbar {...appBarProps} />

      <Background />
    </div>
  );
}

export default LandingPage;
