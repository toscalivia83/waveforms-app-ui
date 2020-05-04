/* eslint-disable @typescript-eslint/unbound-method */
import React from "react";
import { mount } from "enzyme";
import AudioForm from "./AudioForm";

describe("<AudioForm /> suite", () => {
  it("renders correctly", () => {
    const peaksUrl= "http://test.url";
    const wrapper = mount(<AudioForm peaksUrl={peaksUrl} onSubmit={jest.fn().mockResolvedValue(Promise.resolve())}/>);
    expect(wrapper.find("input[name='numberOfBreaths']")).toHaveLength(1);
    expect(wrapper.find("input[name='hasHeartBeats']")).toHaveLength(1);
    expect(wrapper.find("input[type='submit']")).toHaveLength(1);
  });
});
