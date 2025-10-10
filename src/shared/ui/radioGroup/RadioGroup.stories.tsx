import type { Meta, StoryObj } from '@storybook/react'
import { RadioGroup } from './RadioGroup'
import { useState } from 'react'

const meta = {
  component: RadioGroup,
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Account Type',
    options: [
      { label: 'Personal', value: 'personal' },
      { label: 'Business', value: 'business' },
    ],
    value: 'personal',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Account Type',
    options: [
      { label: 'Personal', value: 'personal' },
      { label: 'Business', value: 'business' },
    ],
    value: 'personal',
    disabled: true,
  },
}
