import { ACTION } from "./Database/actions";
import { QUERIES } from "./Database/queries";

import { ERROR } from "./error";
import { RESPONSE } from "./responce";
import { setData, getData } from "./Database/useDatabase";

let account = undefined;
console.log("account ", account);
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
        case RequestType.LOGIN:
          debugger;
          const data = getData(body.accountName);
          if (data === null) return serverResponse(ERROR.INVALID_ACCOUNT, null);
          else if (data.key === body.key) {
            account = data;
            return serverResponse(RESPONSE.SIGNIN_SUCCESSFUL, data);
          } else return serverResponse(ERROR.INVALID_KEY, null);
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
            setData(body.accountName, account);

            return serverResponse(RESPONSE.SIGNUP_SUCCESSFUL, account);
          }
          // if account does not exists
          else return serverResponse(ERROR.PREEXISTING_ACCOUNT, null);

        case RequestType.SAVE_FILE:
          debugger;
          //check if the file already exists
          const file = account.files.find((file) =>
            file ? file.id === body.id : true
          );

          //if the file does not exits then save it
          if (file === undefined) {
            //update the account
            account.files.push(body);

            //updata the account data in db
            setData(account.accountName, account);

            return serverResponse(RESPONSE.FILE_SAVED_SUCCESSFUL, account);
          } else return serverResponse(ERROR.PREEXISTING_FILE, null);
        default:
      }
      break;
    case MethodType.PUT:
      switch (requestType) {
        case RequestType.SAVE_FILE:
          //find the file then index of the file, remove the old file, push the new file on the files stack
          const file = account.files.find((file) => file.id === body.id);
          const index = account.files.indexOf(file);
          account.files.splice(index, 1);
          account.files.push(body);
          setData(account.accountName, account);

          return serverResponse(RESPONSE.FILE_SAVED_SUCCESSFUL, account);
        // const updatedFile = account.files.find((file) => {
        //   if (file.id === body.id) {
        //     file = body;
        //     return true;
        //   } else return false;
        // });
        // if (updatedFile === null) account.files.push(body);

        case RequestType.CREATE_FILE:
          // const file = account.files.find((file) => {
          //   if (file.id === body.id) {
          //     file = body;
          //     return true;
          //   } else return false;
          // });
          // if (updatedFile !== null)
          //   return serverResponse(RESPONSE.FILE_SAVED_SUCCESSFUL, account);
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
          account.files = account.files.filter((file) => {
            debugger;
            return file.id !== body;
          });

          setData(account.accountName, account);
          return serverResponse(RESPONSE.FILE_DELETED, account);

        case RequestType.DELETE_ACCOUNT:
          break;
        default:
      }
      break;
    default:
  }
};
