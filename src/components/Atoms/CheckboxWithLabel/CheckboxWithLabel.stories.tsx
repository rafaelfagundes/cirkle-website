import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import CheckBoxWithLabel from "./index";

const Template = (args: any) => (
  <CheckBoxWithLabel {...args}></CheckBoxWithLabel>
);

// Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  label: "Check Here",
  onClick: () => null,
  value: true,
};

export default {
  title: "Components/CheckBoxWithLabel",
  component: CheckBoxWithLabel,
} as Meta;
