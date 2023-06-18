
import Background from "./Background";
import Appbar from "./Appbar";
import About from "./About";

function LandingPage() {
  return (
    <div>
      <Appbar />
      <Background>
        <About />
      </Background>
    </div>
  );
}

export default LandingPage;
