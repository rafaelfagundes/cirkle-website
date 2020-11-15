import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import CustomTextField from "./index";

describe("CustomTextField", () => {
  it("should have a placeholder", () => {
    const wrapper = mount(<CustomTextField>Placeholder</CustomTextField>);
    expect(wrapper.find("input").prop("placeholder")).toEqual("Placeholder");
  });

  it("should have an initial value", () => {
    const wrapper = mount(
      <CustomTextField initialValue="Initial Value">
        Placeholder
      </CustomTextField>
    );

    expect(wrapper.at(0).prop("initialValue")).toEqual("Initial Value");
    expect(wrapper.find("input").prop("defaultValue")).toEqual("Initial Value");
  });

  it("should have an error text message", () => {
    const wrapper = mount(
      <CustomTextField error="An Error Occurred" initialValue="Initial Value">
        Placeholder
      </CustomTextField>
    );
    expect(wrapper.find("CustomTextField__ErrorText").text()).toEqual(
      "An Error Occurred"
    );
  });

  it("should have an icon", () => {
    const wrapper = mount(
      <CustomTextField type="password" showIcon={true}>
        Placeholder
      </CustomTextField>
    );
    expect(wrapper.find("Icon__Image").exists()).toBeTruthy();
  });

  it("shouldn't have an icon", () => {
    const wrapper = mount(
      <CustomTextField type="password" showIcon={false}>
        Placeholder
      </CustomTextField>
    );
    expect(wrapper.find("Icon__Image").exists()).toBeFalsy();
  });
});
