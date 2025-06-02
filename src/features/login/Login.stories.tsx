
import type { Meta, StoryObj } from '@storybook/react'
import {Login} from "@features/login/Login";


const meta = {
  title: 'Features/Login',
  component: Login,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Login>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {},
}
