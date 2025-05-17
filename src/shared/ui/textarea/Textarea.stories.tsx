import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@radix-ui/themes';
import { Textarea } from '@shared/ui/textarea/Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {
    title: 'Описание',
    placeholder: 'Введите текст...',
    size: '2',
    variant: 'classic',
  },
};

export const WithError: Story = {
  args: {
    ...Primary.args,
    errorMessage: 'Поле обязательно для заполнения',
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,

  },
};

export const Filled: Story = {
  args: {
    ...Primary.args,
    defaultValue: 'Уже введённый текст',
  },
};