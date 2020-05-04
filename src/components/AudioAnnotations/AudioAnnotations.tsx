import React from "react";
import { AudioFormDetails } from "../../types/app";
import styles from "./AudioAnnotations.module.css";

interface Props {
  annotations: AudioFormDetails;
}

const AudioAnnotations = ({ annotations }: Props): React.ReactElement => {
  return (
    <div className={styles.container}>
      <div>Number of breaths: {annotations.numberOfBreaths}</div>
      <div>{annotations.hasHeartBeats ? "Has heart beats" : "Does not have heart beats"}</div>
      <div>Audio url: {annotations.audioUrl}</div>
      <br />
    </div>
  );
};

export default AudioAnnotations;