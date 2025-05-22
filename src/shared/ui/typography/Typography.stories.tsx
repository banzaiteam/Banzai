import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from '@shared/ui'

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
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const H1: Story = {
    args: {
        variant: 'h1',
        as: 'h1',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const H2: Story = {
    args: {
        variant: 'h2',
        as: 'h2',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const H3: Story = {
    args: {
        variant: 'h3',
        as: 'h3',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Regular_text_16: Story = {
    args: {
        variant: 'regular_text_16',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Bold_text_16: Story = {
    args: {
        variant: 'bold_text_16',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Regular_text_14: Story = {
    args: {
        variant: 'regular_text_14',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Medium_text_14: Story = {
    args: {
        variant: 'medium_text_14',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Bold_text_14: Story = {
    args: {
        variant: 'bold_text_14',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Small_text: Story = {
    args: {
        variant: 'small_text',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Semi_bold_small_text: Story = {
    args: {
        variant: 'semi_bold_small_text',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Regular_link: Story = {
    args: {
        variant: 'regular_link',
        children: <>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</>,
    }
}

export const Small_link: Story = {
    args: {
        variant: 'small_link',
        children: <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus doloremque impedit iste nihil
            quia voluptatibus. Adipisci cum dicta, doloremque ea earum eligendi exercitationem libero maxime molestias,
            officia sapiente vero, voluptatem!</p>,
    }
}