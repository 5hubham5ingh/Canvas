import { createContext, useContext, useState } from "react";

const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  debugger
  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  return useContext(userContext);
};
