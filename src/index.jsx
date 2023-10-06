import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { StoreProvider } from "./store";
import SearchProvider from "./store/SearchProvider";
import ModalProvider from "./store/ModalProvider";
import DataProvider from "./store/DataProvider";
import App from "./App";
import "react-chat-elements/dist/main.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(document.getElementById("root"));
const cLientId =
  "293176661295-u30go0p55kk809hb2l2qmvgpnhlfet3s.apps.googleusercontent.com";

root.render(
  <GoogleOAuthProvider clientId={cLientId}>
    <Router>
      {/* <React.StrictMode> */}
      <DataProvider>
        <ModalProvider>
          <SearchProvider>
            <StoreProvider>
              <App />
            </StoreProvider>
          </SearchProvider>
        </ModalProvider>
      </DataProvider>
      {/* </React.StrictMode> */}
    </Router>
  </GoogleOAuthProvider>
);
