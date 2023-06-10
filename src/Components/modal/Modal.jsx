import { Box, Modal as MUIModal } from "@mui/material";
import SignUpNLogInTab from "../SignUpNLogInTabs";
import { useReducer, createContext, useContext } from "react";

const initialState = false;

// Modal reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case "close":
      return false;
    case "open":
      return true;
    default:
  }
}

// Modal Context
const modalContext = createContext();

// Modal Context provider
export function ModalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <modalContext.Provider value={{ state, dispatch }}>
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
  const { state, dispatch } = useModal();

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
    dispatch({ type: "close" });
  };

  return (
    <MUIModal
      open={state}
      onClose={handleClose}
      aria-labelledby="log-in"
      aria-describedby="log-in-page"
    >
      <Box sx={style}>
        <SignUpNLogInTab />
      </Box>
    </MUIModal>
  );
}
