import type { Meta, StoryObj } from "@storybook/react";
// importing out Select component from the same folder
import Select from "./Select";
// meta is an object and Meta comes from storybook and specifing data type
const meta: Meta<typeof Select> = {
  // speicifing which object we want to display
  component: Select,
  // need it for auto documentation
  tags: ["autodocs"],
};
// exporting by default our object
export default meta;
// below is story for our component
type Story = StoryObj<typeof Select>;
// passing above Story below here
export const Primary: Story = {
  // args is an object that has properties
  args: {
    primary: true,
    label: "Button",
  },
};
