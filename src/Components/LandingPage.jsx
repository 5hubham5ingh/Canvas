import React, { useRef } from "react";
import Background from "./Background";
import Appbar from "./Appbar";
import LogIn from "./LogIn";
import SignUpNLoginModal from "./SignUpNLogInModal";

function LandingPage() {
  const logInRef = useRef();
  const appBarProps = {
    logIn: logInRef,
  };
  return (
    <div>
      <Appbar {...appBarProps} />

      <Background />
      <SignUpNLoginModal ref={logInRef} />
      {/* <LogIn ref={logInRef} /> */}
    </div>
  );
}

export default LandingPage;
