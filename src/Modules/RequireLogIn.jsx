
import { Outlet } from "react-router-dom";
import { useUser } from "./User/userContext";



function RequireLogIn() {
  const { user, setUser } = useUser();

 

  if (user !== undefined) return <Outlet />;
  else return "Please login first.";
}

export default RequireLogIn;
