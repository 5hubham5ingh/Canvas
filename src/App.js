import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReportDesigner from "./Components/ReportDesigner";
import ReportViewer from "./Components/ReportViewer";
import RequireLogIn from "./Components/RequireLogIn";
import LandingPage from "./Components/LandingPage";
import SnackBar from "./Components/snackbar/SnackBar";
import { Modal } from "./Components/modal/Modal";

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
