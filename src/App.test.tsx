import React from "react";
import { mount } from "enzyme";
import App from "./App";
import AudioForm from "./components/AudioForm/AudioForm";

describe("<App /> suite", () => {
  it("renders correctly", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(AudioForm).exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
