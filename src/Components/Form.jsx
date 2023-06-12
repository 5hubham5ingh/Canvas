import { logInValidationSchema } from "../utils/schema";
import { useFormik } from "formik";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useSnackBar } from "./snackbar/SnackBar";
import { ACTION } from "./snackbar/Actions";

function Form(props) {
  const snackbar = useSnackBar();
  const logIn = (values) => {
    //Get the account from local storage
    const accountString = localStorage.getItem(values.accountName);
    //Check if account exists
    if (accountString !== null) {
      const account = JSON.parse(accountString);
      //Check if the key matches
      if (account.key === values.key) {
      }
      //If the key doesn't match
      else {
        snackbar.dispatch(ACTION.INVALID_KEY);
      }
    }
    //if the account doesn't exists
    else {
      snackbar.dispatch(ACTION.INVALID_ACCOUNT);
    }
  };
  const signUp = (values) => {
    const accounts = Object.key(localStorage);
    //If account already exists
    if (accounts.includes(values.accountName)) {
      snackbar.dispatch(ACTION.ACCOUNT_ALREADY_EXITS);
    } else {
      try {
        let data = JSON.stringify({
          accountName: values.accountName,
          key: values.key,
          report: [],
        });
        localStorage.setItem(values.accountName, data);
        snackbar.dispatch(ACTION.SIGNED_UP);
      } catch (e) {
        if (e.name === "QuotaExceededError") {
          snackbar.dispatch(ACTION.STORAGE_FULL);
        }
      }
    }
  };
  const submit = (values) =>
    props.type === "signUp" ? signUp(values) : logIn(values);

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
  debugger;
  console.log("props.type ", props.type);
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
          {props.type}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider color="#000066" />
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
