import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const LogIn = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  console.log(open);
  useImperativeHandle(ref, () => {
    return { open: handleOpen };
  });
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
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="log-in"
      aria-describedby="log-in-page"
    >
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Account name" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Key" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "lightsteelblue" }}
              type="submit"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
});

export default LogIn;
