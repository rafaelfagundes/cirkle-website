import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import CustomSelect, { SelectItem } from "./index";

const Template = (args) => <CustomSelect {...args} />;

export const Default = Template.bind({});

const items: Array<SelectItem> = [
  {
    title: "Opção A",
    value: "A",
  },
  {
    title: "Opção B",
    value: "B",
  },
  {
    title: "Opção C",
    value: "C",
  },
  {
    title: "Opção D",
    value: "D",
  },
  {
    title: "Opção E",
    value: "E",
  },
];

Default.args = {
  label: "Selecione uma das opções",
  value: "C",
  items,
};

export default {
  title: "Components/Select",
  component: CustomSelect,
} as Meta;
