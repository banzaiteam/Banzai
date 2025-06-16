import type {Meta, StoryObj} from '@storybook/react';
import {useState} from "react";
import {fn} from "@storybook/test";
import {EyeOffOutline, EyeOutline, SearchOutline} from "@/assets/icons/components";
import {Input, type InputProps, InputSlot} from "@shared/ui";


const RenderPassword = ({onClick,...rest}:InputProps) => {
    const [isShowPassword, setIsShowPassword] = useState(false);

   const  onClickHandler = () =>{
       setIsShowPassword(!isShowPassword);
   }

    return  <Input placeholder={'password'} type={isShowPassword ? 'text' : 'password'} {...rest}>

        <InputSlot aria-label={isShowPassword ? 'Показывать' : 'Не показывать'} onClick={onClickHandler}>
            {isShowPassword ? <EyeOffOutline stroke={'currentColor'}/> :
                <EyeOutline stroke={'currentColor'}/>}
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

        placeholder: 'Введите текст...',
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
export const WithSubTitleWithError: Story = {
    args: {
        ...Default.args,
        subTitle:'SubTitle',
        error: true,
        helperText: 'Обязательное поле',
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
        side:'left',
        children: <InputSlot>
            <SearchOutline  stroke='currentColor'/>
        </InputSlot>
    },
};


