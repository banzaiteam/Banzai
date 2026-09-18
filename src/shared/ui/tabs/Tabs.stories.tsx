import type { Meta, StoryObj } from '@storybook/react'

import {Tabs} from './Tabs'

const meta = {
    component: Tabs,
    tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        tabs: [
            {
                value: 'tab-1',
                title: 'Tab1'
            },
            {
                value: 'tab-2',
                title: 'Tab2'
            },
            {
                value: 'tab-3',
                title: 'Tab3'
            }
        ],
        defaultValue: 'tab-1',
    }
}

export const Disabled: Story = {
    args: {
        tabs: [
            {
                value: 'tab-1',
                title: 'Tab1'
            },
            {
                value: 'tab-2',
                title: 'Tab2',
                disabled: true,
            },
            {
                value: 'tab-3',
                title: 'Tab3',
                disabled: true,
            }
        ],
        defaultValue: 'tab-1',
    }
}