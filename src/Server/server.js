import database from "./Database/useDatabase";
import useDatabase from "./Database/useDatabase";

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

/**
 * @param {MethodType} methodType requestType
 * @param {RequestType} requestType requestType
 * @param {Object} body request Body to send
 */

export const sendRequest = (methodType, requestType, body) => {
  const { read } = database();
  switch (methodType) {
    case MethodType.GET:
      switch (requestType) {
        case RequestType.LOGIN:
          const response = read(body, "account");
          if (response === "invalid_key" || response === "invalid_account") {
            const res = { error: response };
            return res;
          } else return response;
        default:
      }
      break;

    case MethodType.POST:
      switch (requestType) {
        case RequestType.SIGNUP:
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
