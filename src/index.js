import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SnackBarContextProvider } from "./Components/snackbar/SnackBar";
import { ModalContextProvider } from "./Components/modal/Modal";
import { UserContextProvider } from "./Components/User/userContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SnackBarContextProvider>
      <UserContextProvider>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </UserContextProvider>
    </SnackBarContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
