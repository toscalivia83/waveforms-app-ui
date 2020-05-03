import React, { useState } from "react";

const AudioSignal = (): React.ReactElement => {
  const [breathsNumber, setBreathsNumber] = useState("0");
  const [hasHeartBeats, setHasHeartBeats] = useState(false);

  return (
    <div>
      <div>
        <label>Number of breaths</label>
        <input
          name="breathsNumber"
          value={breathsNumber}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            console.log("breath nb field changed");
            setBreathsNumber(event.target.value);
          }}/>
      </div>
      <div>
        <label>Presence of heart beats</label>
        <input
          type="checkbox"
          name="termsAndConditions"
          checked={Boolean(hasHeartBeats)}
          onChange={(): void => {
            setHasHeartBeats(!hasHeartBeats);
          }}
        />
      </div>
    </div>
  );
};

export default AudioSignal;