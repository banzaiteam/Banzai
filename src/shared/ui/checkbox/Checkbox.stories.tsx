import type { Meta, StoryObj } from '@storybook/react'

import {Checkbox} from './Checkbox'

const meta = {
    component: Checkbox,
    tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
    }
}

export const DefaultWithLabel: Story = {
    args: {
        label: 'check-box'
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
        label: 'check-box'
    }
}

export const Checked: Story = {
    args: {
       checked: true,
    }
}

export const CheckedAndDisabled: Story = {
    args: {
        checked: true,
        disabled: true,
    }
}