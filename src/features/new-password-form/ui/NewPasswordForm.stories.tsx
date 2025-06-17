
import type { Meta, StoryObj } from '@storybook/react'
import {SignUp} from "@features/signUp/ui/signUp/SignUp";


const meta = {
  title: 'Features/SignUp',
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
