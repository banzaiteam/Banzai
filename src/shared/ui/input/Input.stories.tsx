import type { Meta, StoryObj } from '@storybook/react';
import {Input, type InputProps, InputSlot} from "@shared/ui/input";
import {Icon} from "@shared/ui/icon/Icon";
import {type MouseEvent, useCallback, useState} from "react";
import {fn} from "@storybook/test";



const RenderPassword = ({onClick,...rest}:InputProps)       =>{
    const [isShowPassword, setIsShowPassword] = useState(false);

    const eyeToggle = useCallback ((e:MouseEvent<HTMLInputElement>)=>{e.stopPropagation();
        onClick?.(e);
        setIsShowPassword(prev=>!prev);
       },[])

    return <Input   {...rest}  type={isShowPassword ? 'text':'password' }>
        <InputSlot  side={'right'} onClick={eyeToggle}>
            {isShowPassword ? <Icon name="eye-off-outline" size={24} stroke='white'/> : <Icon name="eye-outline" size={24} stroke='white'/> }
        </InputSlot>
    </Input>
}


const meta: Meta<typeof Input> = {
    title: 'Shared/Input',
    component: Input,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
        theme:{
            default: 'dark', // 'light' | 'dark'
        }
    },

    argTypes: {
        // ... ваши argTypes
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
    args: {
        onChange:fn(),

        placeholder: 'Введите текст...', // Более уместно для textarea
        size: '3', // Размер из Radix (1-3)

    },
};
export const WithError: Story = {
    args: {
        ...Default.args,
        error: true,
        helperText: 'Обязательное поле',
    },
};
export const WithSubTitle: Story = {
    args: {
        ...Default.args,
    subTitle:'SubTitle'
    },
};
export const WithDisabled: Story = {
    args: {
        ...Default.args,
            disabled: true,
    },
};
export const Password: Story = {

    args: {

        ...Default.args,
        subTitle:'Password',
        onClick:fn(),

    },
    render:RenderPassword
};
export const Search: Story = {

    args: {

        ...Default.args,
        subTitle:'Search',
        children: <InputSlot >
            <Icon name="search-outline" size={24} stroke='currentColor'/>
        </InputSlot>

    },
};



