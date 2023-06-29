import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useUser } from "./User/userContext";

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

function RequireLogIn() {
  const { user, setUser } = useUser();

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

  if (user !== undefined) return <Outlet />;
  else return "Please login first.";
}

export default RequireLogIn;
