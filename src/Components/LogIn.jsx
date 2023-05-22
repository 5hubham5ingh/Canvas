import { Box, Button, Grid, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { logInValidationSchema } from "../utils/schema";

const LogIn = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
    enableScroll();
  };
  const handleOpen = () => {
    disableScroll();
    setOpen(true);
  };

  const logIn = () => {};

  const initialValues = {
    accountName: "",
    key: "",
  };
  const initialParameters = {
    initialValues: initialValues,
    validationSchema: logInValidationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: logIn,
  };

  const { errors, handleSubmit, handleBlur, handleChange, values, touched } =
    useFormik(initialParameters);

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
        <Grid container component={"form"} spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="accountName"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.accountName}
              error={errors.accountName && touched?.accountName}
              helperText={touched?.accountName ? errors.accountName : ""}
              label="Account name"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="key"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.key}
              error={errors.key && touched?.key}
              helperText={touched?.key ? errors?.key : ""}
              label="Key"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "lightsteelblue",
                float: "right",
                borderRadius: "10px",
                color: "black",
                "&:hover": { backgroundColor: "darkblue", color: "white" },
              }}
              type="submit"
              onClick={handleSubmit}
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
