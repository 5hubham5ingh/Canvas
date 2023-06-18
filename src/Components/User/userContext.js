import { createContext, useContext, useReducer } from "react";
import { ACTION as USER_ACTIONS } from "./action";
import { MethodType, RequestType, sendRequest } from "../../Server/server";
import { ACTION as SNACKBAR_ACTIONS } from "../snackbar/Actions";
import { ERROR as SERVER_ERRORS } from "../../Server/error";
import { useSnackBar } from "../snackbar/SnackBar";
import {RESPONSE as SERVER_RESPONSE} from "../../Server/responce"
const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const snackbar = useSnackBar();
  const reducer = (state, action) => {
    switch (action.type) {
      case USER_ACTIONS.SIGNIN:
        //Send logIn request
        const response = sendRequest(
          MethodType.GET,
          RequestType.LOGIN,
          action.payload
        );

        if (response.status !== undefined) {
          //LogIn unsuccessful
          if (response.status === SERVER_ERRORS.INVALID_KEY)
            snackbar.dispatch(SNACKBAR_ACTIONS.INVALID_KEY);
          else if (response.status === SERVER_ERRORS.INVALID_ACCOUNT)
            snackbar.dispatch(SNACKBAR_ACTIONS.INVALID_ACCOUNT);
        } //Login Successful
        else {
          snackbar.dispatch(SNACKBAR_ACTIONS.LOGGED_IN);
          return responce.data;
        }
        break;
      case USER_ACTIONS.LOGOUT:
        break;
      case USER_ACTIONS.SIGNUP:
        const responce = sendRequest(
          MethodType.POST,
          RequestType.SIGNUP,
          action.payload
        );
          //CHECK IF SIGNUP FAILED
        if (responce.status === SERVER_ERRORS.PREEXISTING_ACCOUNT)
          snackbar.dispatch(SNACKBAR_ACTIONS.ACCOUNT_ALREADY_EXITS);
        else if (responce.status === SERVER_ERRORS.DATABASE_FULL)
          snackbar.dispatch(SNACKBAR_ACTIONS.STORAGE_FULL);
        else if (responce.status === SERVER_RESPONSE.SIGNUP_SUCCESSFUL) {
          //Sigup Successful
          snackbar.dispatch(SNACKBAR_ACTIONS.SIGNED_UP);
          return response.data;
        }
        break;
      default: return false
    }
  };
  const [user, dispatch] = useReducer(reducer, undefined);
  console.log("user: ",user)
  return (
    <userContext.Provider value={{ user, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
