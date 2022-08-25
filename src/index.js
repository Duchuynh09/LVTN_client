import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import SearchProvider from "./store/SearchProvider";
import ModalProvider from "./store/ModalProvider";
import DataProvider from "./store/DataProvider";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <React.StrictMode>
      <DataProvider>
        <ModalProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </ModalProvider>
      </DataProvider>
    </React.StrictMode>
  </Router>
);
