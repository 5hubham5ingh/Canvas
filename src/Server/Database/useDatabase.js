import { ERROR } from "../error";
import { ACTION } from "./actions";
import { QUERIES } from "./queries";

function database() {
  /**
   * @param {Object} data data
   * @param {String} query query
   */
  const create = (data, query) => {
    switch (query) {
      case QUERIES.ACCOUNT:
        //If account already exists
        if (localStorage.getItem(data.accountName) !== null) {
          
          return ERROR.PREEXISTING_ACCOUNT;
        } else {
          try {
            let dataString = JSON.stringify({
              accountName: data.accountName,
              key: data.key,
              report: [],
            });
            localStorage.setItem(data.accountName, dataString);
          
            return ACTION.POST_SUCCESSFUL;
          } catch (e) {
            if (e.name === "QuotaExceededError") {
              return ERROR.DATABASE_FULL;
            }
          }
        }
        break;
      case QUERIES.FILE:
        break;
      default:
    }
  };

  const read = (data, query) => {
    switch (query) {
      case QUERIES.ACCOUNT: 
      //Get the account from local storage
        const accountString = localStorage.getItem(data.accountName);
        //Check if account exists
        if (accountString !== null) {
          const account = JSON.parse(accountString);
          //Check if the key matches
          if (account.key === data.key) {
            return account;
          }
          //If the key doesn't match
          else {
            return ERROR.INVALID_KEY;
          }
        }
        //if the account doesn't exists
        else return ERROR.INVALID_ACCOUNT;

      case QUERIES.FILE:
        break;
      default:
    }
  };

  const update = (data, query) => {
    switch (query) {
      case QUERIES.ACCOUNT:
        break;
      case QUERIES.FILE:
        break;
      default:
    }
  };
  const destroy = (data, query) => {
    switch (query) {
      case QUERIES.ACCOUNT:
        break;
      case QUERIES.FILE:
        break;
      default:
    }
  };
  return { create, read, update, destroy };
}

export default database;
