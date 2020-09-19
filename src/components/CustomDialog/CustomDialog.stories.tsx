import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import CustomDialog from "./index";

const Template = (args) => <CustomDialog {...args} />;

export const Default = Template.bind({});

Default.args = {
  open: true,
  title: "Título da caixa de diálogo",
  children:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, maiores! Rem repudiandae ea veritatis repellat commodi, cum dolorem illo mollitia, consequatur beatae officiis accusamus. Tenetur rem expedita delectus vitae at.",
};

export default {
  title: "Components/Dialog",
  component: CustomDialog,
} as Meta;
