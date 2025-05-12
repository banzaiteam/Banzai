import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@radix-ui/themes'; // Импортируем Theme провайдер
import { RadixTextarea } from "@shared/ui/textarea/RadixTextarea";

const meta: Meta<typeof RadixTextarea> = {
  title: 'Shared/RadixTextarea',
  component: RadixTextarea,
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

type Story = StoryObj<typeof RadixTextarea>;

export const Primary: Story = {
  args: {
    placeholder: 'Введите текст...', // Более уместно для textarea
    size: '2', // Размер из Radix (1-3)
    variant: 'classic', // 'classic' или 'surface'
  },
};

export const WithError: Story = {
  args: {
    ...Primary.args,
    error: true,
    errorMessage: 'Обязательное поле',
  },
};