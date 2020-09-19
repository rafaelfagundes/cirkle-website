import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import Colors from "../../enums/Colors";
import Title from "./index";

describe("Title", () => {
  it("should render Title in an H1 tag with 'Title Example' text", () => {
    const wrapper = mount(<Title>Title Example</Title>);
    expect(wrapper.find("h1").text()).toEqual("Title Example");
  });
  it("should render Title in an H1 tag with 72px size", () => {
    const wrapper = mount(<Title size={72}>Title Example</Title>);
    expect(wrapper.find("h1").prop("size")).toEqual(72);
    expect(wrapper.find("h1")).toHaveStyleRule("font-size", "72px");
  });
  it("should render Title in an H1 tag with Primary Color", () => {
    const wrapper = mount(<Title color={Colors.PRIMARY}>Title Example</Title>);
    expect(wrapper.find("h1").prop("color")).toEqual(Colors.PRIMARY);
    expect(wrapper.find("h1")).toHaveStyleRule("color", Colors.PRIMARY);
  });
});
