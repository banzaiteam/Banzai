import type { Meta, StoryObj } from '@storybook/react'

import { Recaptcha } from './Recaptcha'

const meta = {
    component: Recaptcha,
    tags: ['autodocs'],
} satisfies Meta<typeof Recaptcha>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        onVerifyAction: (value: null | string) => {
            console.log('Recaptcha value changed:', value)
        },
    }
}

export const Error: Story = {
    args: {
        onVerifyAction: () => {
        },
        error: 'Please verify that you are not a robot',
    }
}