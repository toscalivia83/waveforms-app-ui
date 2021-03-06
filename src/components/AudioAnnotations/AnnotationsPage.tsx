import React, { useState } from "react";
import ApiClient from "../../service/ApiClient";
import { AudioAnnotation } from "../../types/app";
import AudioAnnotations from "./AudioAnnotations";
import styles from "./AnnotationsPage.module.css";

interface Props {
  displayAnnotation: boolean;
  onClick: Function;
}

const AnnotationsPage = ({ displayAnnotation, onClick }: Props): React.ReactElement => {
  const [audioAnnotations, setAudioAnnotations] = useState([] as AudioAnnotation[]);

  React.useEffect(() => {
    async function getAudioAnnotations(): Promise<void> {
      const AudioAnnotationResponse = await ApiClient.getAudioAnnotations();
      setAudioAnnotations(AudioAnnotationResponse.result?.audioAnnotations || []);
    }

    if (displayAnnotation) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getAudioAnnotations();
    }
  }, [displayAnnotation]);

  return (
    <div className={styles.container}>
      <button
        onClick={(): void => onClick()}
        className={"btn btn-default"}>
        {!displayAnnotation ? "Display submitted infos" : "Hide submitted infos"}
      </button>
      {
        displayAnnotation && audioAnnotations.length > 0 &&
        audioAnnotations.map((audioAnnotation, index) =>
          <AudioAnnotations
            key={index}
            annotations={audioAnnotation}/>
        )
      }
      {
        displayAnnotation && !audioAnnotations.length &&
        <div>No audio Annotations registered</div>
      }
    </div>
  );
};

export default AnnotationsPage;