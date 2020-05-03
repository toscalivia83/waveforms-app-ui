import React from "react";

const Peaks = (): React.ReactElement => {
  return (
    <div>
      <div id="waveform-container">
        <div id="zoomview-container"></div>
        <div id="overview-container"></div>
      </div>

      <div id="demo-controls">
        <audio
          id="audio"
          controls
          src="https://storage.googleapis.com/annotation_tool_feebris/lung_sound_2.wav"
          />
          {/* src="https://storage.googleapis.com/annotation_tool_feebris/lung_sound_2.wav" */}

        <button data-action="zoom-in">Zoom in</button>
        <button data-action="zoom-out">Zoom out</button>
      </div>
    </div>
  );
};

export default Peaks;