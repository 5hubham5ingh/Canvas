import React from "react";
import background from "../images/background.png";

function Background() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "round",
        height: "220vh",
        width: "100vw",
        textAlign: "center",
        verticalAlign: "center",
        // backgroundSize: "100%",
        backgroundSize: "cover",
        // filter: "blur(5px)",
      }}
    ></div>
  );
}

export default Background;
