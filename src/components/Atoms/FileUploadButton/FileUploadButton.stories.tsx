import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { AVAILABLE_ICONS } from "../Icon";
import FileUploadButton from "./index";

const Template = (args) => <FileUploadButton {...args} />;

// Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  children: "Choose File",
  variant: "contained",
  type: "primary",
  width: 140,
  loading: false,
};

export default {
  title: "Components/FileUploadButton",
  component: FileUploadButton,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
    type: {
      control: {
        type: "inline-radio",
        options: ["primary", "secondary", "disabled", "success", "delete"],
      },
    },
    variant: {
      control: {
        type: "inline-radio",
        options: ["contained", "outlined", "text"],
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
