import { logInValidationSchema } from "../utils/schema";
import { useFormik } from "formik";
import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { useSnackBar } from "./snackbar/SnackBar";
import { ACTION } from "./snackbar/Actions";
import { sendRequest, RequestType, MethodType } from "../Server/server";
import { ERROR as SERVER_ERRORS } from "./../Server/error";
import { useUser } from "./User/userContext";
import { ACTION as USER_ACTIONS } from "./User/action";

function Form(props) {
  const snackbar = useSnackBar();
  const { user, dispatch } = useUser();
  const logIn = (values) => {
    dispatch({ type: USER_ACTIONS.SIGNIN, payload: values });
  };
  const signUp = (values) => {
    dispatch({ type: USER_ACTIONS.SIGNUP, payload: values });
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
            "&:hover": { backgroundColor: "#1DA1F2", color: "white" },
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
