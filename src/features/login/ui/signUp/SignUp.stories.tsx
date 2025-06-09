
import type { Meta, StoryObj } from '@storybook/react'
import {SignUp} from "@features/login/ui/signUp/SignUp";


const meta = {
  title: 'Features/Login',
  component: SignUp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
   args: {},
}
