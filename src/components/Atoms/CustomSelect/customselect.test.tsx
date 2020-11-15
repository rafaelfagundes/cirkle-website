import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import CustomSelect from "./index";

const globalWrapper = mount(
  <CustomSelect
    label="label"
    items={[
      { title: "Title", value: "Value" },
      { title: "Title2", value: "Value2" },
    ]}
    value={"Value"}
    setValue={(value) => value}
  ></CustomSelect>
);

describe("CustomSelect", () => {
  it("should have label of value 'label'", () => {
    expect(globalWrapper.at(0).prop("label")).toEqual("label");
  });

  it("should have a value of 'Value'", () => {
    expect(globalWrapper.at(0).prop("value")).toEqual("Value");
  });

  it("should have a value of 'Value'", () => {
    expect(globalWrapper.at(0).prop("value")).toEqual("Value");
  });

  it("should invoke setValue", () => {
    expect(globalWrapper.invoke("setValue")("Value2")).toEqual("Value2");
  });

  it("should change value to 'Value2'", () => {
    const setValue = (value: string) => {
      expect(value).toEqual("Value2");
    };
    const wrapper = mount(
      <CustomSelect
        label="label"
        items={[
          { title: "Title", value: "Value" },
          { title: "Title2", value: "Value2" },
        ]}
        value="Value"
        setValue={setValue}
      ></CustomSelect>
    );

    wrapper.find("input").invoke("onChange")({ target: { value: "Value2" } });
  });
});
