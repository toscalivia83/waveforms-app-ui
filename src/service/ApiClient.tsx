import { AudioWaveformResponse, AudioFormDetails } from "../types/app";
import { HttpError, BaseResponse } from "../types/http";

export class ApiClient {
  public readonly host: string;

  public constructor(baseUrl: string) {
    this.host = baseUrl;
  }

  public async getLungSoundData(recordId: string): Promise<BaseResponse<AudioWaveformResponse>> {
    const uri = `${this.host}/lung-sound/${recordId}`;
    const response = await fetch(uri);

    try  {
      const responseJson = await response.json();
      console.log("responseJson", responseJson);
      
      return {
        statusCode: response.status,
        result: responseJson
      };
    } catch (e) {
      const error: HttpError = new Error(`request for ${uri} failed`);
      error.notFound = response.status === 404;
      error.status = response.status;
      throw error;
    }
  }

  public async postAudioFormDetails(audioForm: AudioFormDetails): Promise<BaseResponse<string>> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(audioForm)
    };
    const uri = `${this.host}/audio-form-results`;
    const response = await fetch(uri, requestOptions);

    try  {
      const responseText = await response.text();
      console.log("responseText", responseText);
      
      return {
        statusCode: response.status,
        result: responseText
      };
    } catch (e) {
      const error: HttpError = new Error(`request for ${uri} failed`);
      error.notFound = response.status === 404;
      error.status = response.status;
      throw error;
    }
  }
}

export default new ApiClient(`${window.location.protocol}//${window.location.host}`);