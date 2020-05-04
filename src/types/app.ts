export interface AudioFormDetails {
  numberOfBreaths: string;
  hasHeartBeats: boolean;
  audioUrl: string;
}

export interface AudioAnnotation extends AudioFormDetails {
  _id: number;
}

export interface AudioAnnotationResponse {
  audioAnnotations: AudioAnnotation[];
}
