import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import CustomDatePicker from "./index";

const Template = (args: any) => <CustomDatePicker {...args}></CustomDatePicker>;

// Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  value: Date.now(),
  setDate: () => null,
  placeholder: "Informe a data",
  showYearDropdown: true,
};

export default {
  title: "Components/CustomDatePicker",
  component: CustomDatePicker,
} as Meta;
