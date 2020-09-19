import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import Colors from "../../enums/Colors";
import Subtitle from "./index";

describe("Subtitle", () => {
  it("should render Subtitle in an H2 tag with 'Subtitle Example' text", () => {
    const wrapper = mount(<Subtitle>Subtitle Example</Subtitle>);
    expect(wrapper.find("h2").text()).toEqual("Subtitle Example");
  });
  it("should render Subtitle in an H2 tag with 72px size", () => {
    const wrapper = mount(<Subtitle size={72}>Subtitle Example</Subtitle>);
    expect(wrapper.find("h2").prop("size")).toEqual(72);
    expect(wrapper.find("h2")).toHaveStyleRule("font-size", "72px");
  });
  it("should render Subtitle in an H2 tag with Primary Color", () => {
    const wrapper = mount(
      <Subtitle color={Colors.PRIMARY}>Subtitle Example</Subtitle>
    );
    expect(wrapper.find("h2").prop("color")).toEqual(Colors.PRIMARY);
    expect(wrapper.find("h2")).toHaveStyleRule("color", Colors.PRIMARY);
  });
});
