import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@radix-ui/themes';
import { RadixButton } from './RadixButton';
import { Icon } from '../icon/Icon';

const meta: Meta<typeof RadixButton> = {
  title: 'Shared/RadixButton',
  component: RadixButton,
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
      options: ['primary', 'secondary', 'outline', 'text', 'variant21'],
    },
    children: {
      control: { type: 'text' },
      defaultValue: 'Button',
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof RadixButton>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
    disabled: false,
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
    disabled: false,
  },
};

export const Text: Story = {
  args: {
    variant: 'text-button',
    children: 'Button',
    disabled: false,
  },
};

export const Variant21: Story = {
  args: {
    variant: 'variant21',
    children: (
      <>
        <Icon name="Flag_United_Kingdom"/>
        <span>English</span>
      </>),
  },
};