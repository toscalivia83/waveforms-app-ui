import React from "react";
import "./App.css";
import AudioSignal from "./components/AudioSignal/AudioSignal";
import Peaks from "./components/Peaks/Peaks";

const App = (): React.ReactElement => {
  return (
    <div className="App">
      Hello Feebris application
      <AudioSignal />
      <Peaks />
    </div>
  );
};

export default App;
