import Background from "./Background";
import Appbar from "./Appbar";
import About from "./About";
import Body from "./Body";

function LandingPage() {
  return (
    <>
      <Appbar />
      <Background>
        <Body />
        <About />
      </Background>
    </>
  );
}

export default LandingPage;
