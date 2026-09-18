'use client'
import React, { type ComponentPropsWithoutRef, useId } from 'react'
import clsx from 'clsx'
import s from './Input.module.scss'
import { TextField } from '@radix-ui/themes'

export type InputTypes = 'text' | 'email' | 'password'

export type InputProps = {
  type?: InputTypes
  subTitle?: string
  error?: boolean
  helperText?: string
  side?: 'left' | 'right'
} & Omit<ComponentPropsWithoutRef<typeof TextField.Root>, 'type'>

type InputSlotProps = Omit<ComponentPropsWithoutRef<'button'>, 'type'>

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
    ['aria-label']: ariaLabel,
    ...rest
  } = props

  const defaultId = useId()
  const idCurrent = id || defaultId
  const helperTextId = `${idCurrent}-helper-text`
  const labelId = `${idCurrent}-label`
  const stateClassClsx = {
    [s.disabled]: disabled,
    [s.error]: error,
  }
  const sideClassClsx = {
    [s.left]: side === 'left',
    [s.right]: side === 'right',
  }
  return (
    <div
      className={clsx(
        s.container,
        className,
        { ...stateClassClsx },
        children && { ...sideClassClsx }
      )}
    >
      {subTitle && (
        <label id={labelId} className={s.sub_title} htmlFor={idCurrent}>
          {subTitle}
        </label>
      )}
      <TextField.Root
        className={s.wrapper}
        type={type}
        id={idCurrent}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-labelledby={subTitle && labelId}
        aria-describedby={helperText && helperTextId}
        aria-invalid={error}
        aria-disabled={disabled}
        {...rest}
      >
        {children && (
          <TextField.Slot className={clsx(s.children_wrapper, sideClassClsx)}>
            {children}
          </TextField.Slot>
        )}
      </TextField.Root>

      {helperText && (
        <span id={helperTextId} className={s.error_message}>
          {helperText}
        </span>
      )}
    </div>
  )
}

export const InputSlot = (props: InputSlotProps) => {
  const { className, ...rest } = props

  return <button className={clsx(s.slot_button, className)} type={'button'} {...rest} />
}
