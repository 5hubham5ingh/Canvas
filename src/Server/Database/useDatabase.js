function database() {
  const create = (data, query) => {
    switch (query) {
      case "account":
        break;
      case "file":
        break;
      default:
    }
  };

  const read = (data, query) => {
    switch (query) {
      case "account": //Get the account from local storage
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
            return "invalid_key";
          }
        }
        //if the account doesn't exists
        else return "invalid_account";

      case "file":
        break;
      default:
    }
  };

  const update = (data, query) => {
    switch (query) {
      case "account":
        break;
      case "file":
        break;
      default:
    }
  };
  const destroy = (data, query) => {
    switch (query) {
      case "account":
        break;
      case "file":
        break;
      default:
    }
  };
  return { create, read, update, destroy };
}

export default database;
