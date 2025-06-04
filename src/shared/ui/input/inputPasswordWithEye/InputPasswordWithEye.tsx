import React, {useState} from 'react';
import {Input, type InputProps, InputSlot} from "@shared/ui";
import {EyeOffOutline, EyeOutline} from "@/assets/icons/components";

export const InputPasswordWithEye = (props:InputProps) => {

    const [isShowPassword, setIsShowPassword] = useState(false)


    return  <Input {...props} subTitle={'Password confirmation'} type={isShowPassword ? 'text' : 'password'}
                   placeholder={'******************'} aria-required="true">
        <InputSlot onClick={() => {
            setIsShowPassword((prev) => !prev)
        }} aria-label={isShowPassword ? "Hide password" : "Show password"}>
            {isShowPassword ? <EyeOutline/> : <EyeOffOutline/>}
        </InputSlot>
    </Input>
};

