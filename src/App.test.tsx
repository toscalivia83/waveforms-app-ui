import React from "react";
import { mount } from "enzyme";
import App from "./App";
import AudioSignal from "./components/AudioSignal/AudioSignal";

describe("<App /> suite", () => {
  it("renders correctly", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(AudioSignal).exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
