import { Box, Modal as MuiModal } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

function Modal({ children, props }, ref) {
  const [open, setOpen] = useState(false);
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

  const handleClose = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    setOpen,
  }));

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="log-in"
      aria-describedby="log-in-page"
    >
      <Box sx={style}>{children}</Box>
    </MuiModal>
  );
}

export default forwardRef(Modal);
