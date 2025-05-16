'use client'
import React, {type ChangeEvent, type ComponentPropsWithoutRef, useId} from 'react';
import clsx from "clsx";
import s from './Input.module.scss'
import {useInput} from "@shared/ui/input/useInput";


type InputTypes = 'text' | 'email' | 'password'

export type InputProps = {
    type?: InputTypes
    subTitle?: string
    error?: boolean
    helperText?: string
    side?: 'left' | 'right'


} & Omit<ComponentPropsWithoutRef<'input'>, 'type'>


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
        <div className={clsx(s.wrapper, {...stateClassClsx})}>

            {subTitle && <label className={s.sub_title} htmlFor={idCurrent}>{subTitle}</label>}
            {helperText && <span className={s.error_message}>{helperText}</span>}

            <input type={type} id={idCurrent} disabled={disabled} className={clsx(className, {...stateClassClsx, }, children && {...sideClassClsx})} onChange={onCurrentChangeHandler} {...rest} />

            {children && <span {...rest} className={clsx(s.slot, sideClassClsx)}>{children}
            </span>}

        </div>

    </>
}