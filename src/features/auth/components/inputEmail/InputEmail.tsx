'use client'
import React from 'react';
import {Input, type InputProps} from "@shared/ui";

export const InputEmail = (props:InputProps) => {
    return <Input type={'email'} subTitle={'Email'} placeholder={'Epam@epam.com'} aria-required="true" {...props} />
};

