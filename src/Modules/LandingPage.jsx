import Background from "./Background";
import Appbar from "./Appbar";
import About from "./About";
import Body from "./Body";
import ResponsiveAppbar from "./ResponsiveAppBar";

function LandingPage() {
  return (
    <>
      {/* <Appbar /> */}
      <ResponsiveAppbar/>
      <Background>
        <Body />
        <About />
      </Background>
    </>
  );
}

export default LandingPage;
