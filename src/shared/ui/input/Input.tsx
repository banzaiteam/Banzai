'use client'
import {TextField} from '@radix-ui/themes';

import React, {useId} from 'react';
import clsx from "clsx";
import s from './Input.module.scss'


type InputTypes = 'text' | 'email' | 'password'

export type InputProps = {
    type?: InputTypes
    subTitle?: string
    error?: boolean
    helperText?: string
} & Omit<TextField.RootProps, 'type'>


export const Input = (props: InputProps) => {
    const {
        type='text',
        subTitle = '',
        error = false,
        helperText = '',

        value,
        disabled = false,
        className,
        id,
        children,
        ...rest
    } = props

    const idCurrent = id || useId()

    return <>
        <TextField.Root type={type} autoComplete={"off"} {...rest} id={idCurrent} className={clsx(className, s.wrapper, {
            [s.disabled]: disabled,
            [s.error]: error
        })} disabled={disabled}>

            {subTitle && <label className={s.sub_title} htmlFor={idCurrent}>{subTitle}</label>}
            {helperText && <span className={s.error_message}>{helperText}</span>}
            {children}

        </TextField.Root>

    </>
}