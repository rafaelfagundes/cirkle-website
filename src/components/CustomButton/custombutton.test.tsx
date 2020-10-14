import { mount } from "enzyme";
import "jest-styled-components";
import React from "react";
import Colors from "../../enums/Colors";
import CustomButton from "./index";

describe("CustomButton", () => {
  it("should be normal size", () => {
    const wrapper = mount(<CustomButton onClick={null}>OK</CustomButton>);

    expect(wrapper.childAt(0)).toHaveStyleRule("height", "44px");
    expect(wrapper.childAt(0)).toHaveStyleRule("width", "120px");
    expect(wrapper.find("span")).toHaveStyleRule("font-size", "14px");
  });
  it("should be small", () => {
    const wrapper = mount(
      <CustomButton onClick={null} small={true}>
        OK
      </CustomButton>
    );

    expect(wrapper.childAt(0)).toHaveStyleRule("height", "28px");
    expect(wrapper.find("span")).toHaveStyleRule("font-size", "12px");
    expect(wrapper.childAt(0).text()).toEqual("OK");
  });
  describe("Outlined Variant", () => {
    it(`default type should have border color and font color equals to ${Colors.PRIMARY}`, () => {
      const wrapper = mount(
        <CustomButton variant="outlined" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.PRIMARY}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.PRIMARY);
    });
    it(`secondary type should have border color and font color equals to ${Colors.SECONDARY}`, () => {
      const wrapper = mount(
        <CustomButton variant="outlined" type="secondary" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.SECONDARY}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.SECONDARY);
    });
    it(`disabled type should have border color and font color equals to ${Colors.LIGHT_GRAY}`, () => {
      const wrapper = mount(
        <CustomButton variant="outlined" type="disabled" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.LIGHT_GRAY}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.LIGHT_GRAY);
    });
    it(`success type should have border color and font color equals to ${Colors.FOREST_GREEN_CRAYOLA}`, () => {
      const wrapper = mount(
        <CustomButton variant="outlined" type="success" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.FOREST_GREEN_CRAYOLA}`
      );
      expect(wrapper.find("span")).toHaveStyleRule(
        "color",
        Colors.FOREST_GREEN_CRAYOLA
      );
    });
    it(`delete type should have border color and font color equals to ${Colors.RED_CRAYOLA}`, () => {
      const wrapper = mount(
        <CustomButton variant="outlined" type="delete" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.RED_CRAYOLA}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.RED_CRAYOLA);
    });
  });
  describe("Contained Variant", () => {
    it(`default type should have background color of ${Colors.PRIMARY} color and font color equals to ${Colors.WHITE}`, () => {
      const wrapper = mount(
        <CustomButton variant="contained" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.PRIMARY}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.WHITE);
    });
    it(`secondary type should have background color of ${Colors.SECONDARY} color and font color equals to ${Colors.WHITE}`, () => {
      const wrapper = mount(
        <CustomButton variant="contained" type="secondary" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.SECONDARY}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.WHITE);
    });
    it(`disabled type should have background color of ${Colors.LIGHT_GRAY} color and font color equals to #555`, () => {
      const wrapper = mount(
        <CustomButton variant="contained" type="disabled" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.LIGHT_GRAY}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", "#555");
    });
    it(`success type should have background color of ${Colors.FOREST_GREEN_CRAYOLA} color and font color equals to #555`, () => {
      const wrapper = mount(
        <CustomButton variant="contained" type="success" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.FOREST_GREEN_CRAYOLA}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.WHITE);
    });
    it(`delete type should have background color of ${Colors.RED_CRAYOLA} color and font color equals to ${Colors.WHITE}`, () => {
      const wrapper = mount(
        <CustomButton variant="contained" type="delete" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule(
        "border",
        `2px solid ${Colors.RED_CRAYOLA}`
      );
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.WHITE);
    });
  });
  describe("Text Variant", () => {
    it(`default type should have font color equals to ${Colors.PRIMARY}`, () => {
      const wrapper = mount(
        <CustomButton variant="text" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule("border", undefined);
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.PRIMARY);
    });
    it(`secondary type should have font color equals to ${Colors.SECONDARY}`, () => {
      const wrapper = mount(
        <CustomButton variant="text" type="secondary" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule("border", undefined);
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.SECONDARY);
    });
    it(`disabled type should have font color equals to ${Colors.LIGHT_GRAY}`, () => {
      const wrapper = mount(
        <CustomButton variant="text" type="disabled" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule("border", undefined);
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.LIGHT_GRAY);
    });
    it(`success type should have font color equals to ${Colors.FOREST_GREEN_CRAYOLA}`, () => {
      const wrapper = mount(
        <CustomButton variant="text" type="success" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule("border", undefined);
      expect(wrapper.find("span")).toHaveStyleRule(
        "color",
        Colors.FOREST_GREEN_CRAYOLA
      );
    });
    it(`delete type should have font color equals to ${Colors.RED_CRAYOLA}`, () => {
      const wrapper = mount(
        <CustomButton variant="text" type="delete" onClick={null}>
          OK
        </CustomButton>
      );
      expect(wrapper.childAt(0)).toHaveStyleRule("border", undefined);
      expect(wrapper.find("span")).toHaveStyleRule("color", Colors.RED_CRAYOLA);
    });
  });
  it("should have an person icon", () => {
    const wrapper = mount(
      <CustomButton onClick={null} icon="person">
        OK
      </CustomButton>
    );
    expect(wrapper.find("Icon")).toBeDefined();
    expect(wrapper.find("Icon").prop("type")).toEqual("person");
  });
  it("should have a loading animation", () => {
    const wrapper = mount(
      <CustomButton onClick={null} loading={true}>
        OK
      </CustomButton>
    );

    expect(wrapper.find("Loading")).toBeDefined();
    expect(wrapper.at(0).prop("loading")).toBeTruthy();
  });
  it("should invoke onClick function", () => {
    const wrapper = mount(
      <CustomButton
        onClick={() => {
          return "button clicked";
        }}
      >
        OK
      </CustomButton>
    );

    expect(wrapper.find("CustomButton").invoke("onClick")(null)).toEqual(
      "button clicked"
    );
  });
});
