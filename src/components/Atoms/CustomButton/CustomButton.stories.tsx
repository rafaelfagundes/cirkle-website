import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { AVAILABLE_ICONS } from "../Icon";
import CustomButton from "./index";

const Template = (args) => <CustomButton {...args} />;

// Each story then reuses that template
export const Contained = Template.bind({});

const Common = {
  children: "Button",
};

Contained.args = {
  ...Common,
  onClick: null,
};
export const Outlined = Template.bind({});

Outlined.args = {
  ...Common,
  variant: "outlined",
  onClick: null,
};
export const Text = Template.bind({});

Text.args = {
  ...Common,
  variant: "text",
  onClick: null,
};

export default {
  title: "Components/Button",
  component: CustomButton,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    type: {
      control: {
        type: "inline-radio",
        options: [
          "primary",
          "secondary",
          "disabled",
          "success",
          "delete",
          "edit",
        ],
      },
    },
    icon: {
      control: {
        type: "select",
        options: AVAILABLE_ICONS,
      },
    },
  },
} as Meta;
