import React from "react";

interface Props {
  peaksUrl: string;
}

const Peaks = ({ peaksUrl }: Props): React.ReactElement => {
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
          src={peaksUrl}
          />

        <button data-action="zoom-in">Zoom in</button>
        <button data-action="zoom-out">Zoom out</button>
      </div>
    </div>
  );
};

export default Peaks;