'use client'
import React, {type ComponentPropsWithoutRef, type MouseEventHandler, type ReactNode, useEffect} from 'react';
import {useInput} from "@shared/ui/input/useInput";
import clsx from "clsx";


type InputTypes = 'text' | 'email' | 'password'
type iconPosition = 'left' | 'right'

type Props = {
    onIconClick?: MouseEventHandler<HTMLButtonElement>
    fullWidth?: boolean
    subTitle?: string
    /*error нужен для стилизации*/
    error?: boolean
    /*helperText нужен для текстовой подсказки*/
    helperText?: string
    type?: InputTypes
    icon?: ReactNode
    iconPosition?: iconPosition
    onChange?: (value: string) => void
    value?: string
} & Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'onChange' | 'children'>

export const Input = (props: Props) => {
    const {
        subTitle,
        error = false,
        fullWidth = false,
        helperText,
        onIconClick,
        iconPosition = 'right',
        type,
        value,
        disabled = false,
        className,
        icon,
        onChange,
        ...rest
    } = props
    const {value: currentValue, onChange: onChangeValue} = useInput(value)

    useEffect(() => {
        onChange?.(currentValue)
    }, [currentValue, onChange])


    const onIconClickHandler:MouseEventHandler<HTMLButtonElement> = (e) => {
        /* без этот
         *  e.preventDefault()
         *  e.stopPropagation()
         * === double срабатывания onIconClick
         * */
        e.preventDefault()
        e.stopPropagation()
        onIconClick?.(e)
    }

    const wrapperClassNames = clsx(
        `flex relative items-center`,
        fullWidth && 'w-full',
        disabled && 'text-dark-100',
    )
    const inputClassNames = clsx(
        `appearance-none w-full border rounded-[2px] py-1.5 peer focus:border-primary-500 focus:ring-primary-500 active:ring-0 bg-dark-900`,
        error ? 'border-danger-500 active:border-primary-500 focus:ring-0' : 'border-dark-100',
        iconPosition === 'left' ? 'pl-10 pr-3' : 'pl-3 pr-10',
        disabled ? 'cursor-not-allowed placeholder:text-[inherit]' : 'placeholder:text-light-900 active:border-light-100 active:bg-dark-500',

        className
    )
    const labelClassNames = clsx(
        `flex items-center cursor-pointer absolute -translate-y-1/2 top-1/2 peer-focus:text-light-100`,
        iconPosition === 'right' ? ' right-2' : 'left-2',
        !disabled &&
        (!!currentValue || type === 'password' ? 'text-light-100' : 'text-light-900'),
    )
    const subTitleClassNames = clsx('absolute top-0 left-0 -translate-y-full capitalize',
        disabled ? 'text-[inherit]' : 'text-light-900')

    return (
        <div className={wrapperClassNames}>
            {subTitle && (
                <span className={subTitleClassNames}>
          {subTitle}
        </span>
            )}
            <input
                className={inputClassNames}
                type={type}
                value={currentValue}
                onChange={onChangeValue}
                disabled={disabled}
                {...rest}
            />
            {helperText && (
                <span
                    className={clsx(
                        `absolute translate-y-full bottom-0 left-0`,
                        error && 'text-danger-500',
                    )}
                >
          {helperText}
        </span>
            )}
            <label
                className={labelClassNames}
            >
                <button
                    onClick={onIconClickHandler}
                    className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={disabled}
                >
                    {icon}
                </button>
            </label>
        </div>
    )
}

