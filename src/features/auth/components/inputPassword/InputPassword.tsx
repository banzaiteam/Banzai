import React, {useState} from 'react';
import {BaseInput, type BaseInputProps, BaseInputSlot} from "@shared/ui";
import {EyeOffOutline, EyeOutline} from "@/assets/icons/components";


export const InputPassword = (props:BaseInputProps) => {

    const [isShowPassword, setIsShowPassword] = useState(false)
    const onClickHandler = () => {
        setIsShowPassword((prev) => !prev)
    }

    return <BaseInput type={isShowPassword ? 'text' : 'password'} placeholder={'******************'} aria-required="true" {...props}>
        <BaseInputSlot onClick={onClickHandler} aria-label={isShowPassword ? "Hide password" : "Show password"}>
            {isShowPassword ? <EyeOutline/> : <EyeOffOutline/>}
        </BaseInputSlot>
    </BaseInput>
};

