import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportDesigner from "./Components/ReportDesigner";
import ReportViewer from "./Components/ReportViewer";
import RequireLogIn from "./Components/RequireLogIn";
import LandingPage from "./Components/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<RequireLogIn />}>
          <Route path="/Designer" element={<ReportDesigner />} />
          <Route path="/Viewer" element={<ReportViewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
