import React from 'react';
import {BaseInput, type BaseInputProps} from "@shared/ui";

export const InputEmail = (props:BaseInputProps) => {
    return <BaseInput type={'email'} {...props} />
};

