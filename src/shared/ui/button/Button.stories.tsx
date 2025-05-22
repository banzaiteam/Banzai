import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@radix-ui/themes';
import { Button } from './Button';
import { FlagRussia } from '@/assets/icons/components';

const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'text-button', 'with-icons'],
      defaultValue: 'primary',
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Button',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    width: {
      control: { type: 'text' },
      description: 'CSS width value (e.g., "100px", "50%")',
    },
    minHeight: {
      control: { type: 'text' },
      description: 'CSS height value',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'This is Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

export const TextButton: Story = {
  name: 'Text Button',
  args: {
    variant: 'text-button',
    children: 'Text Button',
  },
};

export const WithIcon: Story = {
  name: 'With Icon',
  args: {
    variant: 'with-icons',
    children: (
      <>
        <FlagRussia />
        <span>Russia</span>
      </>
    ),
  },
};

export const DisabledStates: Story = {
  name: 'Disabled States',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary" disabled>
        Disabled Primary
      </Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
      <Button variant="text-button" disabled>
        Disabled Text
      </Button>
    </div>
  ),
};

export const CustomSizes: Story = {
  name: 'Custom Sizes',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
      <Button variant="primary" width="200px">
        Large Button
      </Button>
      <Button variant="secondary" width="120px" minHeight="48px">
        Small Button
      </Button>
    </div>
  ),
};