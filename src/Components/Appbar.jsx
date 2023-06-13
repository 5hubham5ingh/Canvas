import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useModal } from "./modal/Modal";
import { ACTION as modalAction } from "./modal/Action";
import { animateScroll } from "react-scroll";

export default function Appbar({ aboutRef }) {
  const navigate = useNavigate();
  const { dispatchModal } = useModal();
  const handleClick = (button) => {
    switch (button.target.name) {
      case "designer":
        navigate("/designer");
        break;
      case "viewer":
        navigate("/viewer");
        break;
      case "logIn":
        // props.logIn.current.open();
        dispatchModal({ type: modalAction.OPEN_LOGIN });
        break;
      case "signUp":
        // props.signUp.current.open();
        dispatchModal({ type: modalAction.OPEN_SIGNUP });
        break;
      case "about":
        animateScroll.scrollToBottom();
        break;
      default:
    }
  };
  return (
    <AppBar
      position="fixed"
      color="transparent"
      sx={{
        backgroundImage: "linear-gradient(black, transparent)",
      }}
      elevation={0}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color="aqua"
          sx={{ flexGrow: 1 }}
        >
          Canvas
        </Typography>
        <Button
          name="designer"
          onClick={handleClick}
          sx={{ color: "aqua", marginRight: "50px" }}
        >
          Designer
        </Button>
        <Button
          name="viewer"
          onClick={handleClick}
          sx={{ color: "aqua", marginRight: "50px" }}
        >
          Viewer
        </Button>
        <Button
          name="logIn"
          onClick={handleClick}
          sx={{ color: "aqua", marginRight: "50px" }}
        >
          Login
        </Button>
        <Button
          name="signUp"
          onClick={handleClick}
          sx={{ color: "aqua", marginRight: "50px" }}
        >
          SignUp
        </Button>
        <Button name="about" onClick={handleClick} sx={{ color: "aqua" }}>
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}
