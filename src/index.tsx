import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as PeaksInit from "./peaks-init";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

PeaksInit.init();

serviceWorker.unregister();
