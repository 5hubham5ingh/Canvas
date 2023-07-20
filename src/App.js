import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SnackBar from "./Modules/snackbar/SnackBar";
import { Modal } from "./Modules/modal/Modal";
import Loader from "./Modules/Loader";
const ReportDesigner = lazy(() => import("./Modules/ReportDesigner"));
const ReportViewer = lazy(() => import("./Modules/ReportViewer"));
const RequireLogIn = lazy(() => import("./Modules/RequireLogIn"));
const LandingPage = lazy(() => import("./Modules/LandingPage"));

export default function App() {
  return (
    <>
      <SnackBar />
      <Modal />
      <BrowserRouter>
        <Suspense fallback={<Loader/>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<RequireLogIn />}>
              <Route path="/Designer" element={<ReportDesigner />} />
              <Route path="/Viewer" element={<ReportViewer />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
