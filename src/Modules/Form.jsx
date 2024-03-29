import { logInValidationSchema } from "../utils/schema";
import { useFormik } from "formik";
import {
  Button,
 
  Divider,
 
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackBar } from "./snackbar/SnackBar";
import { ACTION as SNACKBAR_ACTIONS } from "./snackbar/Actions";
import { sendRequest, RequestType, MethodType } from "../Server/server";
import { ERROR as SERVER_ERRORS } from "./../Server/error";
import { RESPONSE as SERVER_RESPONSE } from "../Server/responce";
import { useUser } from "./User/userContext";

import { useModal } from "./modal/Modal";
import { ACTION as MODAL_ACTION } from "./modal/Action";
import { useRef } from "react";
import createSession from "../utils/createSession";
import CheckBox from "./CheckBox";

function Form(props) {
  const snackbar = useSnackBar();
  const { setUser } = useUser();
  const modal = useModal();
  const checkRef = useRef(false);
  
  const logIn = (values) => {
    //Send logIn request
    const response = sendRequest(MethodType.GET, RequestType.LOGIN, values);

    if (response.status === SERVER_RESPONSE.SIGNIN_SUCCESSFUL) {
      createSession(response.data, checkRef.current);
      snackbar.dispatch(SNACKBAR_ACTIONS.LOGGED_IN);
      setUser(response.data);
      modal.dispatchModal({ type: MODAL_ACTION.CLOSE });
      
    } else if (response.status === SERVER_ERRORS.INVALID_ACCOUNT)
      snackbar.dispatch(SNACKBAR_ACTIONS.INVALID_ACCOUNT);
    else if (response.status === SERVER_ERRORS.INVALID_KEY)
      snackbar.dispatch(SNACKBAR_ACTIONS.INVALID_KEY);
  };

  const signUp = (values) => {
    const response = sendRequest(MethodType.POST, RequestType.SIGNUP, values);
    //CHECK IF SIGNUP FAILED
    if (response.status === SERVER_ERRORS.PREEXISTING_ACCOUNT)
      snackbar.dispatch(SNACKBAR_ACTIONS.ACCOUNT_ALREADY_EXITS);
    else if (response.status === SERVER_ERRORS.DATABASE_FULL)
      snackbar.dispatch(SNACKBAR_ACTIONS.STORAGE_FULL);
    else if (response.status === SERVER_RESPONSE.SIGNUP_SUCCESSFUL) {
      //Sigup Successful
      createSession(response.data);
      snackbar.dispatch(SNACKBAR_ACTIONS.SIGNED_UP);
      setUser(response.data);
      modal.dispatchModal({ type: MODAL_ACTION.CLOSE });
    }
  };
  const submit = (values) => {
    props.type === "signUp" ? signUp(values) : logIn(values);
  };

  const initialValues = {
    accountName: "",
    key: "",
  };
  const initialParameters = {
    initialValues: initialValues,
    validationSchema: logInValidationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    onSubmit: submit,
  };

  const { errors, handleSubmit, handleBlur, handleChange, values, touched } =
    useFormik(initialParameters);

  return (
    <Grid container component={"form"} spacing={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5">
          {props.type === "signUp" ? "SignUp" : "LogIn"}
        </Typography>
      </Grid>
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
          type="password"
        />
      </Grid>
      <Grid item xs={12}>
        {props.type === "logIn" ? <CheckBox ref={checkRef} /> : ""}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "lightsteelblue",
            float: "right",
            borderRadius: "10px",
            color: "black",
            "&:hover": { backgroundColor: "#1DA1F2", color: "white" },
          }}
          type="submit"
          onClick={handleSubmit}
        >
          {props.type}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider color="#1DA1F2" />
        {props.type === "signUp" ? (
          <Typography variant="subtitle2">
            Already have an account?
            <Button size="small" onClick={() => props.setTab("logIn")}>
              LogIn
            </Button>
          </Typography>
        ) : (
          <Typography variant="subtitle2">
            Don't have an account?
            <Button size="small" onClick={() => props.setTab("signUp")}>
              SignUp
            </Button>
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default Form;
