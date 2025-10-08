// Storybook renders component in isolation, not in your full app
import React, { useState } from 'react'
// Importing Meta and StoryObj types from Storybook for type checking
import type { Meta, StoryObj } from '@storybook/react'
// importing our Select component from the same folder
import Select from './Select'
import { FlagRussia, FlagUnitedKingdom } from '@/assets/icons/components'

const languageOptions = [
  {
    label: 'English',
    value: 'en',
    flag: <FlagUnitedKingdom />,
  },
  {
    label: 'Russian',
    value: 'ru',
    flag: <FlagRussia />,
  },
]

// This meta object tells Storybook about the Select component
const meta: Meta<typeof Select> = {
  component: Select,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof Select>

// Компонент-обертка для управления состоянием
const SelectWithState = (args: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState(args.value || '')

  return (
    <Select
      {...args}
      value={value}
      onValueChange={val => {
        setValue(val)
        args.onValueChange?.(val)
      }}
    />
  )
}

// === Story 1: With Initial Value ===
export const WithInitialValue: Story = {
  name: 'Select With Languages',
  args: {
    options: languageOptions,
    value: 'en',
  },
  render: args => <SelectWithState {...args} />,
}

// === Story 2: Disabled Select ===
export const Disabled: Story = {
  name: 'Disabled Select',
  args: {
    options: languageOptions,
    disabled: true,
  },
}

const basicOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
]

// === Story: Default Size Without Flags ===
export const Default: Story = {
  name: 'Default',
  args: {
    options: basicOptions,
    value: '1',
    size: 'default',
  },
  render: args => <SelectWithState {...args} />,
}

const basicNumbers = [
  { label: '10', value: '1' },
  { label: '20', value: '2' },
  { label: '100', value: '3' },
]

// === Story: Numbers  ===
export const Small: Story = {
  name: 'Numbers',
  args: {
    options: basicNumbers,
    value: '2',
    size: 'small',
  },
  render: args => <SelectWithState {...args} />,
}
