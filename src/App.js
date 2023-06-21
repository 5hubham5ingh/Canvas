import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportDesigner from "./Modules/ReportDesigner";
import ReportViewer from "./Modules/ReportViewer";
import RequireLogIn from "./Modules/RequireLogIn";
import LandingPage from "./Modules/LandingPage";
import SnackBar from "./Modules/snackbar/SnackBar";
import { Modal } from "./Modules/modal/Modal";

export default function App() {
  return (
    <>
      <SnackBar />
      <Modal />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<RequireLogIn />}>
            <Route path="/Designer" element={<ReportDesigner />} />
            <Route path="/Viewer" element={<ReportViewer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
