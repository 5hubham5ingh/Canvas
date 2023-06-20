import { ACTION } from "./Database/actions";
import { QUERIES } from "./Database/queries";

import { ERROR } from "./error";
import { RESPONSE } from "./responce";

let account = undefined;

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

const newAccount = (body) => {
  return { accountName: body.accountName, key: body.key, files: [] };
};

/**
 * @param {MethodType} methodType requestType
 * @param {RequestType} requestType requestType
 * @param {Object} body request Body to send
 */

export const sendRequest = (methodType, requestType, body) => {
  switch (methodType) {
    case MethodType.GET:
      switch (requestType) {
        default:
      }
      break;

    case MethodType.POST:
      switch (requestType) {
        case RequestType.SIGNUP:
          debugger;
          //Check if account already exists
          if (localStorage.getItem(body.accountName) === null) {
            account = newAccount(body);
            localStorage.setItem(body.accountName, account);

            return serverResponse(RESPONSE.SIGNUP_SUCCESSFUL, account);
          }
          // if account does not exists
          else return serverResponse(ERROR.PREEXISTING_ACCOUNT, null);

        case RequestType.SAVE_FILE:
          const file = account.files.find((file) => {
            if (file === body) return true;
            else return false;
          });
          if (file === undefined) {
            account.files.push(file);
            localStorage.setItem(account.accountName, account);
          } else return serverResponse(ERROR.PREEXISTING_FILE, null);
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
