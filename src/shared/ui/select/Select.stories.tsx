// Storybook renders component in isolation, not in your full app
import React, { useState } from "react";
// Importing Meta and StoryObj types from Storybook for type checking
import type { Meta, StoryObj } from "@storybook/react";
// importing our Select component from the same folder
import Select from "./Select";
import { FlagRussia, FlagUnitedKingdom } from "@/assets/icons/components";

const languageOptions = [
  {
    label: "English", // Text shown in dropdown
    value: "en", // Value used when this option is selected
    flag: (
      <>
        <FlagUnitedKingdom />
      </>
    ),
  },
  {
    label: "Russian",
    value: "ru",
    flag: (
      <>
        <FlagRussia />
      </>
    ),
  },
];

// This meta object tells Storybook about the Select component
const meta: Meta<typeof Select> = {
  component: Select, // Component being documented
  tags: ["autodocs"], // Enables automatic docs
};

// Exporting the meta object so Storybook can read it
export default meta;

// Creating a custom type for stories based on the Select component
type Story = StoryObj<typeof Select>;

// === Story 1: With Initial Value ===
export const WithInitialValue: Story = {
  name: "Select With Initial Value", // Custom name for this story
  args: {
    options: languageOptions, // Same language options
    value: "en", // Starts with English selected
  },
  render: (args) => {
    const [value, setValue] = useState(args.value || "");
    return (
      <Select
        {...args}
        value={value}
        onValueChange={(val) => {
          setValue(val);
          args.onValueChange?.(val);
        }}
      />
    );
  },
};

// === Story 2: Disabled Select ===
export const Disabled: Story = {
  name: "Disabled Select", // Name for this story
  args: {
    options: languageOptions, // Language options
    disabled: true, // Makes the dropdown non-editable
  },
};
