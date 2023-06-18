import React, { useRef } from "react";
import Background from "./Background";
import Appbar from "./Appbar";
import About from "./About";

function LandingPage() {
  const aboutRef = useRef();

  return (
    <div>
      <Appbar  />
      <Background>
        <About ref={aboutRef} />
      </Background>
    </div>
  );
}

export default LandingPage;
