'use client'
import React from 'react';
import {Input, type InputProps} from "@shared/ui";

export const InputUserName = (props:InputProps) => {
    return <Input subTitle={'Username'} placeholder={'Epam'} aria-required="true" {...props} />
};

