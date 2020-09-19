import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import SimpleText from "../SimpleText";
import Card from "./index";

const Template = (args) => (
  <Card {...args}>
    <SimpleText>Card Content</SimpleText>
  </Card>
);

// Each story then reuses that template
export const Default = Template.bind({});

export default {
  title: "Components/Card",
  component: Card,
} as Meta;
