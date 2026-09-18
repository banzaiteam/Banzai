import type { Meta, StoryObj } from '@storybook/react'
import { Menu } from '@shared/ui'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    /* backgroundColor: { control: 'color' },*/
  },

  /*args: { onClick: fn() },*/
} satisfies Meta<typeof Menu>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
  },
}
