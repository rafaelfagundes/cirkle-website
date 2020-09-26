import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import AddressItem from "./index";

const Template = (args) => <AddressItem {...args} />;

// Each story then reuses that template
export const Default = Template.bind({});

Default.args = {
  street: "Rua Frederico Ozanan",
  number: 150,
  complement: "Perto da Biquinha",
  neighborhood: "Guarda-Mor",
  city: "São João del Rei",
  state: "MG",
  postalCode: "36309-012",
  mainAddress: false,
  ediAddress: () => null,
  removeAddress: () => null,
  setMainAddress: () => null,
};

export default {
  title: "Components/AddressItem",
  component: AddressItem,
} as Meta;
