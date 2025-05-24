import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'shared/ui/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: (
      <div style={{ height: '300px', width: '200px' }}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a
          posuere sapien. Etiam accumsan arcu ut facilisis fermentum. Integer
          efficitur metus sit amet tortor dapibus, nec laoreet risus varius.
        </p>
        <p>
          Sed pretium suscipit erat non sagittis. Nunc vitae mi sed nulla
          convallis tristique. Nulla facilisi.
        </p>
        <p>
          Aenean feugiat, purus vitae aliquam viverra, justo sem iaculis arcu,
          in tempus lacus nunc ac neque.
        </p>
      </div>
    ),
  },
}
