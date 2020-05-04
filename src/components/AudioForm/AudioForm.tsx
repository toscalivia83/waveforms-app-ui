import React, { useState } from "react";
import { AudioFormDetails } from "../../types/app";
import styles from "./AudioForm.module.css";

interface Props {
  peaksUrl: string;
  onSubmit: (audioFormDetails: AudioFormDetails) => Promise<void>;
}

const AudioForm = ({ peaksUrl, onSubmit }: Props): React.ReactElement => {
  const [numberOfBreaths, setNumberOfBreaths] = useState("0");
  const [hasHeartBeats, setHasHeartBeats] = useState(false);

  const reinitializeAudioFormDetails = (): void => {
    setNumberOfBreaths("0");
    setHasHeartBeats(false);
  };

  return (
    <div className={styles.container}>
      <h2>Add annotations here:</h2>
      <div>
        <label>Number of breaths: </label>
        <input
          name="numberOfBreaths"
          value={numberOfBreaths}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void => {
            setNumberOfBreaths(event.target.value);
          }}/>
      </div>
      <div>
        <label>Presence of heart beats ? </label>
        <input
          type="checkbox"
          name="hasHeartBeats"
          checked={Boolean(hasHeartBeats)}
          onChange={(): void => {
            setHasHeartBeats(!hasHeartBeats);
          }}
        />
      </div>
      <button
        type="submit"
        onClick={(event: React.MouseEvent): void => {
          event.preventDefault();
          onSubmit({ numberOfBreaths, hasHeartBeats, audioUrl: peaksUrl });
          reinitializeAudioFormDetails();
        }}
        className={styles.submitButton}
      >Submit</button>
    </div>
  );
};

export default AudioForm;