import { ACTION } from "./Database/actions";
import { QUERIES } from "./Database/queries";
import database from "./Database/useDatabase";
import useDatabase from "./Database/useDatabase";
import { ERROR } from "./error";
import { RESPONSE } from "./responce";

export const MethodType = {
  GET: "get",
  PUT: "put",
  POST: "post",
  PATCH: "patch",
  DELETE: "delete",
};

export const RequestType = {
  LOGIN: "login",
  SIGNUP: "signup",
  EDIT_ACCOUNT: "editAccount",
  DELETE_ACCOUNT: "deleteAccount",
  CREATE_FILE: "createFile",
  SAVE_FILE: "saveFile",
  DELETE_FILE: "deleteFile",
};

const serverResponse = (status, data) => {
  return { status: status, data: data };
};

const newAccount = (body)=>{

}

/**
 * @param {MethodType} methodType requestType
 * @param {RequestType} requestType requestType
 * @param {Object} body request Body to send
 */

export const sendRequest = (methodType, requestType, body) => {
  const { read, create } = database();
  switch (methodType) {
    case MethodType.GET:
      switch (requestType) {
        case RequestType.LOGIN:
          const response = read(body, QUERIES.ACCOUNT);
          if (
            response === ERROR.INVALID_KEY ||
            response === ERROR.INVALID_ACCOUNT
          ) {
            return serverResponse(response, null);
          } else return serverResponse(RESPONSE.SIGNIN_SUCCESSFUL, response);
        default:
      }
      break;

    case MethodType.POST:
      switch (requestType) {
        case RequestType.SIGNUP:
          const response = create(body, QUERIES.ACCOUNT);
          if (
            response === ERROR.PREEXISTING_ACCOUNT ||
            response === ERROR.DATABASE_FULL
          ) {
            return serverResponse(response,null);
          } else if (response === ACTION.POST_SUCCESSFUL) {
            return read(body, QUERIES.ACCOUNT);
          }
          return serverResponse(RESPONSE.SIGNUP_SUCCESSFUL, newAccount(body)) ;
          break;
        default:
      }
      break;
    case MethodType.PUT:
      switch (requestType) {
        case RequestType.CREATE_FILE:
          break;
        default:
      }
      break;

    case MethodType.PATCH:
      switch (requestType) {
        case RequestType.SAVE_FILE:
          break;
        default:
      }
      break;
    case MethodType.DELETE:
      switch (requestType) {
        case RequestType.DELETE_FILE:
          break;
        default:
      }
      break;
    default:
  }
};
