import { useReducer } from "react";

const METHODTYPE = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  DELETE: "delete",
};

const REQUESTTYPE = {
  LOGIN: "login",
  SIGNUP: "signup",
};

const databaseReducer = (state, action) => {
  switch (action.methodType) {
    case METHODTYPE.GET:
      switch (action.requestType) {
        case REQUESTTYPE.LOGIN:
          break;
        default:
      }
      break;
    case METHODTYPE.POST:
      switch (action.requestType) {
        case REQUESTTYPE.SIGNUP:
          break;
        default:
      }
      break;
    case METHODTYPE.PATCH:
      break;
    case METHODTYPE.DELETE:
      break;
    default:
  }
};

function useDatabase() {
  const [data, sendRequest] = useReducer(databaseReducer, null);
  return { data, sendRequest };
}

export default useDatabase;
