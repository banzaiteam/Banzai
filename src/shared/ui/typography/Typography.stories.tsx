import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './Typography'

const meta = {
    component: Typography,
    tags: ['autodocs'],
} satisfies Meta<typeof Typography>

export default meta

type Story = StoryObj<typeof meta>

export const Large: Story = {
    args: {
        variant: 'large',
        as: 'div',
        children: <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</div>,
    }
}

export const H1: Story = {
    args: {
        variant: 'h1',
        children: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</p>,
    }
}

export const H2: Story = {
    args: {
        variant: 'h2',
        ...H1.args,
    }
}

export const H3: Story = {
    args: {
        variant: 'h3',
        ...H1.args,
    }
}

export const Regular_text_16: Story = {
    args: {
        variant: 'regular_text_16',
        ...H1.args,
    }
}

export const Bold_text_16: Story = {
    args: {
        variant: 'bold_text_16',
        ...H1.args,
    }
}

export const Regular_text_14: Story = {
    args: {
        variant: 'regular_text_14',
        ...H1.args,
    }
}

export const Medium_text_14: Story = {
    args: {
        variant: 'medium_text_14',
        ...H1.args,
    }
}

export const Bold_text_14: Story = {
    args: {
        variant: 'bold_text_14',
        ...H1.args,
    }
}

export const Small_text: Story = {
    args: {
        variant: 'small_text',
        ...H1.args,
    }
}

export const Semi_bold_small_text: Story = {
    args: {
        variant: 'semi_bold_small_text',
        ...H1.args,
    }
}

export const Regular_link: Story = {
    args: {
        variant: 'regular_link',
        ...H1.args,
    }
}

export const Small_link: Story = {
    args: {
        variant: 'small_link',
        ...H1.args,
    }
}