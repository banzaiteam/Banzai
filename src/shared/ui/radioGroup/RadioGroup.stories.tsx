import type {Meta, StoryObj} from "@storybook/react";
import {RadioGroup} from "@shared/ui/radioGroup/RadioGroup";

const meta = {
    component: RadioGroup,
    tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
    }
}

export const DefaultWithLabel: Story = {
    args: {
        label: 'RadioGroup'
    }
}

export const Disabled: Story = {
    args: {
        disabled: true,
    }
}

export const DisabledWithLabel: Story = {
    args: {
        disabled: true,
        label: 'RadioGroup'
    }
}
