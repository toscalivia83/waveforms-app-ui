import React, { useState } from "react";
import { AudioFormDetails } from "../../types/app";

interface Props {
  peaksUrl: string;
  onSubmit: (audioFormDetails: AudioFormDetails) => Promise<void>;
}

const AudioForm = ({ peaksUrl, onSubmit }: Props): React.ReactElement => {
  const [breathsNumber, setBreathsNumber] = useState("0");
  const [hasHeartBeats, setHasHeartBeats] = useState(false);

  const reinitializeAudioFormDetails = (): void => {
    setBreathsNumber("0");
    setHasHeartBeats(false);
  };

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
      <input
        type="submit"
        onClick={(event: React.MouseEvent): void => {
          event.preventDefault();
          onSubmit({ breathsNumber, hasHeartBeats, url: peaksUrl });
          reinitializeAudioFormDetails();
        }} value="Submit"
      />
    </div>
  );
};

export default AudioForm;