import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from './RadioGroup';
import React from 'react';

const meta: Meta<typeof RadioGroup> = {
    title: 'Shared/RadioGroup',
    component: RadioGroup,
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            options: ['vertical', 'horizontal'],
            control: { type: 'radio' },
        },
        disabled: {
            control: 'boolean',
        },
        onChange: { action: 'changed' }
    },
};

export default meta;
type Story = StoryObj<typeof meta>;


const InteractiveRadioGroup = (args: any) => {
    const [value, setValue] = React.useState(args.value || '');

    const handleChange = (newValue: string) => {
        setValue(newValue);
        args.onChange?.(newValue);
    };

    return <RadioGroup {...args} value={value} onChange={handleChange} />;
};

export const Default: Story = {
    args: {
        name: 'example',
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
        ],
        label: 'Select an option',
    },
    render: (args) => <InteractiveRadioGroup {...args} />
};

export const Horizontal: Story = {
    args: {
        ...Default.args,
        orientation: 'horizontal',
    },
    render: (args) => <InteractiveRadioGroup {...args} />
};

export const Vertical: Story = {
    args: {
        ...Default.args,
        orientation: 'vertical',
    },
    render: (args) => <InteractiveRadioGroup {...args} />
};

export const WithError: Story = {
    args: {
        ...Default.args,
        error: 'Please select a valid option',
    },
    render: (args) => <InteractiveRadioGroup {...args} />
};

export const Disabled: Story = {
    args: {
        ...Default.args,
        disabled: true,
    }
};

export const WithDisabledOption: Story = {
    args: {
        ...Default.args,
        options: [
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2', disabled: true },
            { value: 'option3', label: 'Option 3' },
        ],
    },
    render: (args) => <InteractiveRadioGroup {...args} />
};

export const WithSelectedValue: Story = {
    args: {
        ...Default.args,
        value: 'option2',
    }
};
