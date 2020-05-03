import React, { useState } from "react";
import "./App.css";
import { AudioFormDetails } from "./types/app";
import ApiClient from "./service/ApiClient";
import AudioForm from "./components/AudioForm/AudioForm";
import Peaks from "./components/Peaks/Peaks";

const App = (): React.ReactElement => {
  const [recordId, setRecordId] = useState(1);
  // const [lungSoundData, setLungSoundData] = useState({"hey"});
  const peaksUrl = `https://storage.googleapis.com/annotation_tool_feebris/lung_sound_${recordId}.wav`;

  React.useEffect(() => {
    async function getLungSoundData(): Promise<void> {
      if (recordId < 11 ) {
        const lungSoundDataResponse = await ApiClient.getLungSoundData(recordId.toString());
        console.log("lungSoundDataResponse", lungSoundDataResponse);
      }
      // setLungSoundData(lungSoundDataResponse?.result?.lungSoundData || "");
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getLungSoundData();
  }, [recordId]);

  return (
    <div className="App">
      This is my Feebris application
      <h1>Audio Waveform numero {recordId}:</h1>
      <Peaks peaksUrl={peaksUrl}/>
      <AudioForm
        peaksUrl={peaksUrl}
        onSubmit={async (audioFormDetails: AudioFormDetails): Promise<void> => {
          await ApiClient.postAudioFormDetails(audioFormDetails);
          setRecordId(recordId + 1);
        }}/>
    </div>
  );
};

export default App;
