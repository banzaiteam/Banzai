import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@radix-ui/themes';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Shared/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    mode: {
      control: 'select',
      options: ['single', 'range'],
    },
    onChange: { action: 'dateChanged' },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Primary: Story = {
  args: {
    id: 'date-picker-primary',
    label: 'Select date',
    mode: 'single',
  },
};

export const WithRequiredField: Story = {
  args: {
    ...Primary.args,
    id: 'date-picker-with-required-field',
    label: 'Birth date',
    required: true,
  },
};

export const WithError: Story = {
  args: {
    ...Primary.args,
    id: 'date-picker-with-error',
    error: true,
    errorMessage: 'Please select a valid date',
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    id: 'date-picker-disabled',
    disabled: true,
  },
};

export const DateRange: Story = {
  args: {
    id: 'date-picker-range',
    label: 'Select date range',
    mode: 'range',
  },
};

export const WithInitialValue: Story = {
  args: {
    ...Primary.args,
    id: 'date-picker-with-value',
    value: new Date(),
  },
};