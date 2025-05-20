'use client'
import React, {type ComponentPropsWithoutRef, useId} from 'react';
import clsx from "clsx";
import s from './Input.module.scss'
import {TextField} from "@radix-ui/themes";


type InputTypes = 'text' | 'email' | 'password'

export type InputProps = {
    type?: InputTypes
    subTitle?: string
    error?: boolean
    helperText?: string
    side?: 'left' | 'right'


} & Omit<ComponentPropsWithoutRef<typeof TextField.Root>, 'type'>

type InputSlotProps = ComponentPropsWithoutRef<'button'>

export const Input = (props: InputProps) => {



    const {
        type = 'text',
        subTitle = '',
        error = false,
        helperText = '',
        side = 'right',
        disabled = false,
        className,
        id,
        children,
        ...rest
    } = props


    const idCurrent = id || useId()

    const stateClassClsx = {
        [s.disabled]: disabled,
        [s.error]: error
    };
    const sideClassClsx = {
        [s.left]: side === 'left',
        [s.right]: side === 'right',
    }
    return <>
        <TextField.Root className={clsx(s.wrapper,className, {...stateClassClsx},children && {...sideClassClsx})} type={type} id={idCurrent} disabled={disabled} {...rest}>

            {children && <TextField.Slot className={clsx(s.children_wrapper, sideClassClsx)}>
                {children}

            </TextField.Slot>}
            {subTitle && <label className={s.sub_title} htmlFor={idCurrent}>{subTitle}</label>}
            {helperText && <span className={s.error_message}>{helperText}</span>}
        </TextField.Root>

    </>
}

export const InputSlot =(props:InputSlotProps)=>{
const {className,...rest} = props

    return <button className={clsx(s.slot_button,className)} {...rest} />

};