import { createContext, useContext, useState,useEffect } from "react";

const userContext = createContext();

function getCookieValue(cookieName) {
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + "=")) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
}

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    debugger;
    //Get get the account name from cookies
    const accountName = getCookieValue("accountName");

    //If account exists in cookie then get account data from session storage
    if (accountName !== null) {
      const account = sessionStorage.getItem(accountName);
      if (account !== null) setUser(JSON.parse(account));
    }
  }, []);
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
