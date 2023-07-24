import Background from "./Background";

import About from "./About";
import Body from "./Body";
import ResponsiveAppbar from "./ResponsiveAppBar";

function LandingPage() {
  return (
    <>
     
      <ResponsiveAppbar/>
      <Background>
        <Body />
        <About />
      </Background>
    </>
  );
}

export default LandingPage;
