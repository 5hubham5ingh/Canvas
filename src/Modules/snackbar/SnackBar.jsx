import { Snackbar, Alert } from "@mui/material";
import { createContext, useContext, useReducer } from "react";
import { ACTION } from "./Actions";

const initialState = {
  message: "",
  severity: "success",
  visibility: false,
};

//SnackBar Context
const snackbar = createContext(null);

//SnackBar context provider
export function SnackBarContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <snackbar.Provider value={{ state, dispatch }}>
      {children}
    </snackbar.Provider>
  );
}

//SnackBar reducer
function reducer(state = initialState, action) {
  switch (action) {
    case ACTION.ACCOUNT_ALREADY_EXITS:
      return {
        message: "This account already exits",
        severity: "info",
        visibility: true,
      };
    case ACTION.INVALID_ACCOUNT:
      return {
        message: "Invalid Account",
        severity: "error",
        visibility: true,
      };
    case ACTION.INVALID_KEY:
      return {
        message: "Invalid Key",
        severity: "error",
        visibility: true,
      };
    case ACTION.LOGGED_IN:
      return {
        message: "Login Successful",
        severity: "success",
        visibility: true,
      };
    case ACTION.LOGGED_OUT:
      return {
        message: "Logout Successful",
        severity: "success",
        visibility: true,
      };
    case ACTION.STORAGE_FULL:
      return {
        message: "Storage full",
        severity: "warning",
        visibility: true,
      };
    default:
      return {
        message: "",
        severity: "success",
        visibility: false,
      };
  }
}

//SnackBar component
export default function SnackBar() {
  const snackbar = useSnackBar();
  const close = () => snackbar.dispatch("close");
  return (
    <>
      <Snackbar
        message={snackbar.state.message}
        autoHideDuration={3000}
        open={snackbar.state.visibility}
        onClose={close}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert
          onClose={close}
          severity={snackbar.state.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.state.message}
        </Alert>
      </Snackbar>
    </>
  );
}

//Custom hook for snackbar
export function useSnackBar() {
  return useContext(snackbar);
}
