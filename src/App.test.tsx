/* eslint-disable @typescript-eslint/unbound-method */
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import ApiClient from "./service/ApiClient";
import App from "./App";
import { flushPromise } from "./utils/flushPromise";
import { act } from "@testing-library/react";
import AudioForm from "./components/AudioForm/AudioForm";
import AudioAnnotations from "./components/AudioAnnotations/AudioAnnotations";
import AnnotationsPage from "./components/AudioAnnotations/AnnotationsPage";

const CALLED_ONCE = 1;

describe("<App /> suite", () => {
  let wrapper: ReactWrapper;

  it("renders correctly", () => {
    const wrapper = mount(<App recordId={1} onRecordIdChange={jest.fn}/>);
    expect(wrapper.find(AudioForm).exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders App correctly and submits audio form", async () => {
    ApiClient.postAudioFormDetails = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: "sent"
    }));

    act((): void => {
      wrapper = mount(<App recordId={1} onRecordIdChange={jest.fn}/>);
    });

    expect(wrapper.find("audio").prop("src")).toBe("https://storage.googleapis.com/annotation_tool_feebris/lung_sound_1.wav");
    expect(wrapper.find(AudioAnnotations).exists()).toBeFalsy();

    wrapper.find("input[name='numberOfBreaths']").simulate("change", { target: { value: "45" } });
    wrapper.find("input[name='hasHeartBeats']").simulate("change", { target: {
      checked: true,
    } });

    wrapper.find("button[type='submit']").simulate("click");

    await act(async (): Promise<void> => {
      await flushPromise();
      wrapper.update();
    });

    expect(ApiClient.postAudioFormDetails).toHaveBeenCalledTimes(CALLED_ONCE);
    expect(wrapper.find("h1").text()).toBe("Audio Waveform numero 2:");
    expect(wrapper.find("audio").prop("src")).toBe("https://storage.googleapis.com/annotation_tool_feebris/lung_sound_2.wav");
  });

  it("renders no audio annotations text correctly", async () => {
    ApiClient.getAudioAnnotations = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: {
        audioAnnotations: []
      }
    }));

    act((): void => {
      wrapper = mount(<App recordId={1} onRecordIdChange={jest.fn}/>);
    });

    const displayAnnotationsButton = wrapper.find(AnnotationsPage).find("button");
    displayAnnotationsButton.simulate("click");

    await act(async (): Promise<void> => {
      await flushPromise();
      wrapper.update();
    });

    expect(wrapper.find(AudioAnnotations)).toHaveLength(0);
    expect(ApiClient.getAudioAnnotations).toHaveBeenCalledTimes(CALLED_ONCE);
  });

  it("renders expanded and collapsed audio annotations correctly", async () => {
    ApiClient.getAudioAnnotations = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: {
        audioAnnotations: [{
          numberOfBreaths: "12",
          hasHeartBeats: false,
          audioUrl: "url1",
          _id: 12,
        }]
      }
    }));
    ApiClient.postAudioFormDetails = jest.fn().mockResolvedValue(Promise.resolve({
      statusCode: 200,
      result: "sent"
    }));

    act((): void => {
      wrapper = mount(<App recordId={1} onRecordIdChange={jest.fn}/>);
    });

    const displayAnnotationsButton = wrapper.find(AnnotationsPage).find("button");
    displayAnnotationsButton.simulate("click");

    await act(async (): Promise<void> => {
      await flushPromise();
      wrapper.update();
    });

    expect(wrapper.find(AudioAnnotations)).toHaveLength(1);
    expect(ApiClient.getAudioAnnotations).toHaveBeenCalledTimes(CALLED_ONCE);

    wrapper.find("input[name='numberOfBreaths']").simulate("change", { target: { value: "45" } });
    wrapper.find("input[name='hasHeartBeats']").simulate("change", { target: {
      checked: true,
    } });

    wrapper.find("button[type='submit']").simulate("click");

    await act(async (): Promise<void> => {
      await flushPromise();
      wrapper.update();
    });

    expect(ApiClient.postAudioFormDetails).toHaveBeenCalledTimes(CALLED_ONCE);
    expect(wrapper.find("h1").text()).toBe("Audio Waveform numero 2:");
    expect(wrapper.find("audio").prop("src")).toBe("https://storage.googleapis.com/annotation_tool_feebris/lung_sound_2.wav");
    expect(wrapper.find(AudioAnnotations)).toHaveLength(0);
    expect(ApiClient.getAudioAnnotations).toHaveBeenCalledTimes(CALLED_ONCE);
  });
});
