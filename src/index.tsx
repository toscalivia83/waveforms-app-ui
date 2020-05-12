import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as PeaksInit from "./components/peaks-init";
import * as serviceWorker from "./serviceWorker";

let recordId = 1;

ReactDOM.render(
  <React.StrictMode>
    <App
      recordId={recordId}
      onRecordIdChange={(recordingId: number): void => {
        recordId = recordingId;
        PeaksInit.init(recordId);
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

PeaksInit.init(recordId);

serviceWorker.unregister();
