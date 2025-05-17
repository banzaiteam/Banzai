'use client'
import React, {type ChangeEvent, type ComponentPropsWithoutRef, useId} from 'react';
import clsx from "clsx";
import s from './Input.module.scss'
import {useInput} from "@shared/ui/input/useInput";
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
        onChange,
        side = 'right',
        value='',
        disabled = false,
        className,
        id,
        children,
        ...rest
    } = props



    const {onChange:onCurrentChange} = useInput(value)

    const idCurrent = id || useId()

    const stateClassClsx = {
        [s.disabled]: disabled,
        [s.error]: error
    };
    const sideClassClsx = {
        [s.left]: side === 'left',
        [s.right]: side === 'right',
    }


    const onCurrentChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        onCurrentChange?.(e)
        onChange?.(e)
    };

    return <>
        <TextField.Root className={clsx(s.wrapper, {...stateClassClsx},children && {...sideClassClsx})} type={type} id={idCurrent} disabled={disabled} onChange={onCurrentChangeHandler} {...rest}>



            {/*<input type={type} id={idCurrent} disabled={disabled} className={clsx(className, {...stateClassClsx }, children && {...sideClassClsx})} onChange={onCurrentChangeHandler} {...rest} />*/}

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