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
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
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
);
