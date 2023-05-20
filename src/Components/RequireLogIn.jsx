import React from "react";
import { Outlet } from "react-router-dom";

function RequireLogIn() {
  return <Outlet />;
}

export default RequireLogIn;
