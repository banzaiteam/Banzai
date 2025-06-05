'use client'
import React, {type ComponentPropsWithoutRef, useId} from 'react';
import clsx from "clsx";
import s from './BaseInput.module.scss'
import {TextField} from "@radix-ui/themes";


export type BaseInputTypes = 'text' | 'email' | 'password'

export type BaseInputProps = {
    type?: BaseInputTypes
    subTitle?: string
    error?: boolean
    helperText?: string
    side?: 'left' | 'right'


} & Omit<ComponentPropsWithoutRef<typeof TextField.Root>, 'type'>

type InputSlotProps = Omit<ComponentPropsWithoutRef<'button'>,'type'>

export const BaseInput = (props: BaseInputProps) => {



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
        ["aria-label"]:ariaLabel,
        ...rest
    } = props


    const idCurrent = id || useId()
    const helperTextId = `${idCurrent}-helper-text`;
    const labelId =`${idCurrent}-label`
    const stateClassClsx = {
        [s.disabled]: disabled,
        [s.error]: error
    };
    const sideClassClsx = {
        [s.left]: side === 'left',
        [s.right]: side === 'right',
    }
    return <>
        <TextField.Root className={clsx(s.wrapper,className, {...stateClassClsx},children && {...sideClassClsx})} type={type} id={idCurrent} disabled={disabled}
                        aria-label={ariaLabel}
                        aria-labelledby={subTitle && labelId}
                        aria-describedby={helperText && helperTextId}
                        aria-invalid={error}
                        aria-disabled={disabled}
                        {...rest} >

            {children && <TextField.Slot className={clsx(s.children_wrapper, sideClassClsx)}>
                {children}

            </TextField.Slot>}
            {subTitle && <label id={labelId} className={s.sub_title} htmlFor={idCurrent}>{subTitle}</label>}
            {helperText && <span id={helperTextId} className={s.error_message}>{helperText}</span>}
        </TextField.Root>

    </>
}

export const BaseInputSlot =(props:InputSlotProps)=>{
const {className,...rest} = props

    return <button  className={clsx(s.slot_button,className)} type={'button'} {...rest} />

};