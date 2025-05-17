import type {Meta, StoryObj} from '@storybook/react';
import {Theme} from '@radix-ui/themes'; // Импортируем Theme провайдер
import {Pagination} from "@shared/ui";

const meta: Meta<typeof Pagination> = {
  title: 'Shared/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    // ... ваши argTypes
  },
};

export default meta;

type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {
  args: {
    error: true,
    errorMessage: 'error'
  },
};

export const WithError: Story = {
  args: {
    ...Primary.args,
    error: true,
    errorMessage: 'Обязательное поле',
  },
};