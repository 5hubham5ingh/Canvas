import { Box, Modal } from "@mui/material";

import { forwardRef, useImperativeHandle, useState } from "react";
import SignUpNLogInTab from "./SignUpNLogInTabs";

const SignUpNLoginModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    enableScroll();
  };
  const handleOpen = () => {
    disableScroll();
    setOpen(true);
  };

  let scrollX;
  let scrollY;

  function enableScroll() {
    // Unfix the body element
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";

    // Restore the scroll position
    window.scrollTo(scrollX, scrollY);
  }

  function disableScroll() {
    // Store the current scroll position
    scrollX = window.scrollX;
    scrollY = window.scrollY;

    // Fix the body element
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = `-${scrollX}px`;
  }

  const style = {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50vw",
    bgcolor: "lightsteelblue",
    opacity: "0.9",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
  };

  useImperativeHandle(ref, () => {
    return { open: handleOpen };
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="log-in"
      aria-describedby="log-in-page"
    >
      <Box sx={style}>
        <SignUpNLogInTab />
      </Box>
    </Modal>
  );
});

export default SignUpNLoginModal;
