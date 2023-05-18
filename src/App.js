import * as React from "react";
import { Route, Routes } from "react-router-dom";
import LogIn from "./Components/LogIn";
import ReportDesigner from "./Components/ReportDesigner";
import ReportViewer from "./Components/ReportViewer";
import RequireLogIn from "./Components/RequireLogIn";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LogIn />} />
      <Route element={<RequireLogIn />}>
        <Route path="/Designer" element={<ReportDesigner />} />
        <Route path="/Viewer" element={<ReportViewer />} />
      </Route>
    </Routes>
  );
}
