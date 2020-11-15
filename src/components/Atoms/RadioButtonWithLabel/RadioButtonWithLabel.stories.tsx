import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import RadioButtonWithLabel from "./index";

const Template = (args: any) => (
  <RadioButtonWithLabel {...args}></RadioButtonWithLabel>
);

// Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  label: "Check Here",
  onClick: () => null,
  value: true,
};

export default {
  title: "Components/RadioButtonWithLabel",
  component: RadioButtonWithLabel,
} as Meta;
