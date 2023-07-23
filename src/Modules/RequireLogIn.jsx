import { Outlet } from "react-router-dom";
import { useUser } from "./User/userContext";
import { Button, Stack, Typography } from "@mui/material";

function RequireLogIn() {
  const { user } = useUser();

  if (user !== undefined) return <Outlet />;
  return (
    <div
      style={{
        display: " flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundImage: "linear-gradient(black, #202433)",
      }}
    >
      <Stack direction="column" alignItems="center">

      <h4 style={{color:"steelblue", textOverflow:"wrap", margin:0}}>Unauthorized access.</h4>
      <h4 style={{color:"steelblue"}}>Please login first.</h4>
      <Button variant="contained" onClick={()=>{window.open("/Canvas", "_self")}}>Login</Button>
      </Stack>
    </div>
  );
}

export default RequireLogIn;
