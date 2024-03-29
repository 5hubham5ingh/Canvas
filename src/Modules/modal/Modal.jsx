import { Box, Modal as MUIModal } from "@mui/material";
import { useReducer, createContext, useContext } from "react";
import { ACTION } from "./Action";
import SignUpNLogInTab from "../SignUpNLogInTabs";
import SaveNewFile from "./SaveNewFile/SaveNewFile";
import OpenFiles from "./OpenFiles/OpenFiles";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import Demo from "./Demo/Demo";

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
    case ACTION.OPEN_FILES:
      return { what: ACTION.OPEN_FILES, open: true, payload: action.payload };
    case ACTION.DELETE_ACCOUNT:
      return {
        what: ACTION.DELETE_ACCOUNT,
        open: true,
        payload: action.payload,
      };
    case ACTION.DEMO:
      return { what: ACTION.DEMO, open: true };
    default:
      return state;
  }
}

// Modal Context
const modalContext = createContext();

// Modal Context provider
export function ModalContextProvider({ children }) {
  const [state, dispatchModal] = useReducer(reducer, initialState);
  const asyncDispatchModal = async (obj) => {
    dispatchModal(obj);
  };

  return (
    <modalContext.Provider value={{ state, dispatchModal, asyncDispatchModal }}>
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
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    width: {
      xs: "80vw",
      sm: "80vw",
      md: "50vw",
    },
    bgcolor: "lightsteelblue",
    opacity: "0.9",
    borderRadius: "30px",
    boxShadow: 24,
    p: 0,
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
        ) : state.what === "saveNewFile" ? (
          <SaveNewFile file={state?.payload} />
        ) : state.what === ACTION.OPEN_FILES ? (
          <OpenFiles open={state.payload} />
        ) : state.what === ACTION.DELETE_ACCOUNT ? (
          <DeleteAccount account={state.payload} closeModal={handleClose} />
        ) : state.what === ACTION.DEMO ? (
          <Demo />
        ) : (
          ""
        )}
      </Box>
    </MUIModal>
  );
}
