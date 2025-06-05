'use client'
import React, {useState} from 'react';
import {
    BaseInput,
    type BaseInputProps,
    BaseInputSlot,
    type BaseInputTypes,
} from "@shared/ui/input/baseInput/BaseInput";
import {EyeOffOutline, EyeOutline, SearchOutline} from "@/assets/icons/components";



type Props = Omit<BaseInputProps, 'type'> & {
    type?:BaseInputTypes |'search',
}

export const Input = (props: Props) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const {type='text',...rest} = props



    return <>
        {(type === 'text'||type === 'email') && <BaseInput type={type} {...rest} />}

        {type === 'password' && <BaseInput type={isShowPassword ? 'text' : 'password'} {...rest} subTitle={'Password confirmation'}  placeholder={'******************'} aria-required="true">
            <BaseInputSlot onClick={() => {
                setIsShowPassword((prev) => !prev)
            }} aria-label={isShowPassword ? "Hide password" : "Show password"}>
                {isShowPassword ? <EyeOutline/> : <EyeOffOutline/>}
            </BaseInputSlot>
        </BaseInput>}

            {type === 'search' && <BaseInput type={'text'} {...rest}>
                <BaseInputSlot>
                    <SearchOutline stroke='currentColor'/>
                </BaseInputSlot>
            </BaseInput>}
    </>
}
