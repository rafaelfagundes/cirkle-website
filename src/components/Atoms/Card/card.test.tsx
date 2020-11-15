import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import Card from "./index";

describe("Card", () => {
  it("should have padding", () => {
    const wrapper = mount(
      <Card padding={true}>
        <span>Test</span>
      </Card>
    );
    expect(wrapper.find("div")).toHaveStyleRule("padding", "16px");
  });

  it("shouldn't have padding", () => {
    const wrapper = mount(
      <Card padding={false}>
        <span>Test</span>
      </Card>
    );
    expect(wrapper.find("div")).toHaveStyleRule("padding", "0");
  });
});
