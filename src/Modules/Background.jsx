import React from "react";
import background from "../images/background.png";
import "./Styles/background.css"


function Background({ children }) {
  return (
    <div
    
    className="background"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "round",
        height: "100vh",
        width: "100vw",
        // backgroundSize: "100%",
        backgroundSize: "cover",
        // filter: "blur(5px)",
        position:"sticky",
        top: 0,
        
      }}
    >
      
      {children}
    </div>
  );
}

export default Background;
