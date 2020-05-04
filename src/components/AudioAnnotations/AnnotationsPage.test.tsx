/* eslint-disable @typescript-eslint/unbound-method */
import React from "react";
import { mount, ReactWrapper } from "enzyme";
import AnnotationsPage from "./AnnotationsPage";

describe("<AnnotationsPage /> suite", () => {
  let wrapper: ReactWrapper;

  it("renders correctly", () => {
    const displayAnnotation = false;
    wrapper = mount(<AnnotationsPage displayAnnotation={displayAnnotation} onClick={jest.fn}/>);
    expect(wrapper.find("button").text()).toBe("Display submitted infos");
    wrapper.setProps({ displayAnnotation: true });
    wrapper.update();
    expect(wrapper.find("button").text()).toBe("Hide submitted infos");
  });
});
