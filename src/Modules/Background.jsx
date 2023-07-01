import React from "react";
import background from "../images/background.png";

function Background({ children }) {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "round",
        height: "100vh",
        width: "100vw",
        // backgroundSize: "100%",
        backgroundSize: "cover",
        // filter: "blur(5px)",
        display: "fixed",
      }}
    >
      {children}
    </div>
  );
}

export default Background;
