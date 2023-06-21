import { Box, Modal as MUIModal } from "@mui/material";
import SignUpNLogInTab from "../SignUpNLogInTabs";
import { useReducer, createContext, useContext } from "react";
import { ACTION } from "./Action";
import SaveNewFile from "./SaveNewFile/SaveNewFile";

const initialState = {
  what: "",
  open: false,
};

// Modal reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.OPEN_LOGIN:
      return { what: "logIn", open: true };
    case ACTION.OPEN_SIGNUP:
      return { what: "signUp", open: true };
    case ACTION.CLOSE:
      return initialState;
    case ACTION.SAVE_NEW_FILE:
      return { what: "saveNewFile", open: true, payload: action.payload };
    default:
  }
}

// Modal Context
const modalContext = createContext();

// Modal Context provider
export function ModalContextProvider({ children }) {
  const [state, dispatchModal] = useReducer(reducer, initialState);

  return (
    <modalContext.Provider value={{ state, dispatchModal }}>
      {children}
    </modalContext.Provider>
  );
}

// Custom hook for Modal
export function useModal() {
  return useContext(modalContext);
}

// Modal Component
export function Modal() {
  const { state, dispatchModal } = useModal();

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

  const handleClose = () => {
    dispatchModal({ type: "close" });
  };
  debugger;

  return (
    <MUIModal
      open={state.open}
      onClose={handleClose}
      aria-labelledby="log-in"
      aria-describedby="log-in-page"
    >
      <Box sx={style}>
        {state.what === "signUp" ? (
          <SignUpNLogInTab tab={state.what} />
        ) : state.what === "logIn" ? (
          <SignUpNLogInTab tab={state.what} />
        ) : state.what === "saveNewfile" ? (
          <SaveNewFile file={state?.payload} />
        ) : (
          ""
        )}
      </Box>
    </MUIModal>
  );
}