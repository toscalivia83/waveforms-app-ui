import React, { useState } from "react";
import "./App.css";
import { AudioFormDetails } from "./types/app";
import ApiClient from "./service/ApiClient";
import AudioForm from "./components/AudioForm/AudioForm";
import Peaks from "./components/Peaks/Peaks";

interface Props {
  recordId: number;
  onRecordIdChange: Function;
}

const App = ({ recordId, onRecordIdChange }: Props): React.ReactElement => {
  const [recordingId, setRecordingId] = useState(recordId);
  // const [lungSoundData, setLungSoundData] = useState({"hey"});
  const peaksUrl = `https://storage.googleapis.com/annotation_tool_feebris/lung_sound_${recordingId}.wav`;

  React.useEffect(() => {
    async function getLungSoundData(): Promise<void> {
      if (recordingId < 11 ) {
        const lungSoundDataResponse = await ApiClient.getLungSoundData(recordingId.toString());
        console.log("lungSoundDataResponse", lungSoundDataResponse);
      }
      // setLungSoundData(lungSoundDataResponse?.result?.lungSoundData || "");
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLungSoundData();
  }, [recordId, recordingId]);

  return (
    <div className="App">
      This is my Feebris application
      <h1>Audio Waveform numero {recordingId}:</h1>
      <Peaks peaksUrl={peaksUrl}/>
      <AudioForm
        peaksUrl={peaksUrl}
        onSubmit={async (audioFormDetails: AudioFormDetails): Promise<void> => {
          await ApiClient.postAudioFormDetails(audioFormDetails);
          setRecordingId(recordingId + 1);
          onRecordIdChange(recordingId + 1);
        }}/>
    </div>
  );
};

export default App;
