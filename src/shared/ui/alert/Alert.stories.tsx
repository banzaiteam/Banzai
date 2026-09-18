import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@radix-ui/themes';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Shared/Alert',
  component: Alert,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    status: {
      control: { type: 'radio' },
      options: ['success', 'error'],
      defaultValue: 'success',
    },
    message: {
      control: { type: 'text' },
      defaultValue: 'Operation completed successfully',
    },
    hasCloseButton: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    duration: {
      control: { type: 'number' },
      description: 'Duration in milliseconds (Infinity for no auto-close)',
      defaultValue: Infinity,
    },
  },
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Success: Story = {
  args: {
    status: 'success',
    message: 'Operation completed successfully',
    hasCloseButton: true,
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    message: 'Error! Server is not available',
    hasCloseButton: true,
  },
};

export const AutoClose: Story = {
  args: {
    status: 'success',
    message: 'This message will auto-close after 3 seconds',
    duration: 3000,
  },
  name: 'With Auto-Close (3s)',
};

export const Persistent: Story = {
  args: {
    status: 'error',
    message: 'Error! The format of the uploaded photo must be PNG and JPEG',
    hasCloseButton: true,
    duration: Infinity,
  },
  name: 'Persistent Error',
};

export const WithoutCloseButton: Story = {
  args: {
    status: 'success',
    message: 'Your settings are saved',
    hasCloseButton: false,
  },
};