import type { Meta, StoryObj } from '@storybook/react'
import  {Textarea} from "@shared/ui/textarea/Textarea";

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {

  },
}

export default meta

type Story = StoryObj<typeof Textarea>

export const Primary: Story = {
  args: {
    children: 'Click me',
  },
}