import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import CustomTextField from "./index";

const Template = (args) => <CustomTextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Digite aqui seu texto",
};

export const WithError = Template.bind({});
WithError.args = {
  ...Default.args,
  initialValue: "Algum valor inválido",
  error: "O valor informado é inválido",
};

export default {
  title: "Components/Text Field",
  component: CustomTextField,

  argTypes: {
    type: {
      control: {
        type: "inline-radio",
        options: ["text", "password", "email", "user", "phone"],
      },
    },
  },
} as Meta;
