import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import Colors from "../../../enums/Colors";
import CustomDialog from "./index";

const globalWrapper = mount(
  <CustomDialog open={true} title="Title" onClose={null}>
    Description
  </CustomDialog>
);

describe("CustomDialog", () => {
  it("shouldn't be fullscreen", () => {
    expect(globalWrapper.at(0).childAt(0).prop("fullScreen")).toBeFalsy();
  });

  it("should be XS (extra small) size", () => {
    expect(globalWrapper.at(0).childAt(0).prop("maxWidth")).toEqual("xs");
  });

  it("title should be 'Title'", () => {
    expect(globalWrapper.find("h2").find("span").text()).toEqual("Title");
  });

  it("description should be 'Description'", () => {
    expect(globalWrapper.find("p").text()).toEqual("Description");
  });

  it("should be opened", () => {
    expect(globalWrapper.prop("open")).toBeTruthy();
  });

  it("should be closed", () => {
    const wrapper = mount(
      <CustomDialog open={false} title="Title" onClose={null}>
        Description
      </CustomDialog>
    );
    expect(wrapper.prop("open")).toBeFalsy();
  });

  it("button text should be 'button text'", () => {
    const wrapper = mount(
      <CustomDialog
        open={true}
        title="Title"
        onClose={null}
        buttonText="button text"
      >
        Description
      </CustomDialog>
    );

    expect(wrapper.find(".MuiButton-root").find("span").at(0).text()).toEqual(
      "button text"
    );
  });

  it("should invoke onClose function", () => {
    const wrapper = mount(
      <CustomDialog
        open={true}
        title="Title"
        onClose={() => "close function invoked"}
      >
        Description
      </CustomDialog>
    );

    expect(wrapper.invoke("onClose")(null)).toEqual("close function invoked");
  });

  it("should bet a not error dialog", () => {
    const wrapper = mount(
      <CustomDialog
        open={true}
        title="Title"
        onClose={() => "close function invoked"}
        error={false}
      >
        Description
      </CustomDialog>
    );
    expect(wrapper.find("h2").find("span")).toHaveStyleRule(
      "color",
      Colors.PRIMARY
    );
  });
});
