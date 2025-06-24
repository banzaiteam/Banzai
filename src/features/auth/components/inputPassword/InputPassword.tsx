'use client'
import React, { useState } from 'react'
import { Input, type InputProps, InputSlot } from '@shared/ui'
import { EyeOffOutline, EyeOutline } from '@/assets/icons/components'

export const InputPassword = (props: InputProps) => {
  const { disabled } = props
  const [isShowPassword, setIsShowPassword] = useState(false)
  const onClickHandler = () => {
    setIsShowPassword(prev => !prev)
  }

  return (
    <Input
      type={isShowPassword ? 'text' : 'password'}
      subTitle={'Password'}
      placeholder={'******************'}
      aria-required="true"
      {...props}
    >
      <InputSlot
        onClick={onClickHandler}
        aria-label={isShowPassword ? 'Hide password' : 'Show password'}
        disabled={disabled}
      >
        {isShowPassword ? <EyeOutline /> : <EyeOffOutline />}
      </InputSlot>
    </Input>
  )
}
