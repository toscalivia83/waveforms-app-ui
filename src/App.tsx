import React, { useState } from "react";
import "./App.css";
import { AudioFormDetails } from "./types/app";
import ApiClient from "./service/ApiClient";
import AudioForm from "./components/AudioForm/AudioForm";
import Peaks from "./components/Peaks/Peaks";
import AnnotationsPage from "./components/AudioAnnotations/AnnotationsPage";

interface Props {
  recordId: number;
  onRecordIdChange: Function;
}

const App = ({ recordId, onRecordIdChange }: Props): React.ReactElement => {
  const [recordingId, setRecordingId] = useState(recordId);
  const [displayAnnotation, setDisplayAnnotation] = useState(false);
  const [isEndOfRecords, setIsEndOfRecords] = useState(false);
  const peaksUrl = `https://storage.googleapis.com/annotation_tool_feebris/lung_sound_${recordingId}.wav`;

  const onAudioFormSubmit = async (audioFormDetails: AudioFormDetails): Promise<void> => {
    await ApiClient.postAudioFormDetails(audioFormDetails);
    if (recordingId < 10) {
      setRecordingId(recordingId + 1);
      onRecordIdChange(recordingId + 1);
      setDisplayAnnotation(false);
    } else {
      setIsEndOfRecords(true);
    }
  };

  return (
    <div className="App">
      This is my Feebris application
      <h1>Audio Waveform numero {recordingId}:</h1>
      <Peaks peaksUrl={peaksUrl}/>
      {isEndOfRecords && <div>No more records</div>}
      <AudioForm
        peaksUrl={peaksUrl}
        onSubmit={onAudioFormSubmit}
      />
      <AnnotationsPage
        displayAnnotation={displayAnnotation}
        onClick={(): void => {
          setDisplayAnnotation(!displayAnnotation);
        }}/>
    </div>
  );
};

export default App;
