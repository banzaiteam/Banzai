'use client'

import React, { useState } from 'react'
import s from './SignUp.module.scss'
import { GithubSvgrepoCom31 } from '@/assets/icons/components'
import { Checkbox } from '@shared/ui/checkbox/Checkbox'
import { Button } from '@shared/ui/button/Button'
import { Controller, type SubmitHandler } from 'react-hook-form'
import Link from 'next/link'
import { useSignUpMutation } from '@features/auth/signUp/api/signUp.api'
import { Card, Typography } from '@shared/ui'
import { type FormDataSignUp } from '@features/auth/signUp/model/schemas/signUpSchema'
import {
  EmailSentPopup,
  GoogleButton,
  InputEmail,
  InputPassword,
  InputUserName,
} from '@features/auth/components'
import type { DataSignUp } from '../../model/types/types'
import { useSignUpForm } from '@features/auth'

const SignUp = () => {
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [emailUser, setEmailUser] = useState('epam@epam.com')
  const [signUp, { isLoading }] = useSignUpMutation()

  const {
    signUpForm: {
      register,
      handleSubmit,
      control,
      getValues,
      setError,
      reset,
      formState: { errors, isSubmitting },
    },
    isDisabled,
    password,
    confirmPassword,
  } = useSignUpForm()

  const onClickHandler = () => {
    alert('Нажмал')
  }

  const onSubmitHandler: SubmitHandler<FormDataSignUp> = async ({ username, email, password }) => {
    const formData = new FormData() as DataSignUp
    const data = { email, username, password }

    for (const key in data) {
      formData.append(key, data[key as keyof typeof data])
    }

    try {
      await signUp(formData).unwrap()
      setEmailUser(getValues('email'))
      reset()
      setIsOpenPopup(true)
    } catch (error: any) {
      if (error.status === 400) {
        setError('password', {
          type: 'manual',
          message: 'password too simple',
        })
      } else if (error.status === 409) {
        setError('username', {
          type: 'manual',
          message: error.data.message,
        })
        setError('email', {
          type: 'manual',
          message: error.data.message,
        })
      }
    }
  }

  const onCloseHandler = () => {
    setIsOpenPopup(false)
    setEmailUser('epam@epam.com')
  }

  return (
    <>
      <div className={s.login}>
        <Card className={s.wrapper}>
          <form
            onSubmit={handleSubmit(onSubmitHandler)}
            role="form"
            aria-labelledby="signup-heading"
          >
            <Typography className={s.title} id="signup-heading" variant="h1" as={'h1'}>
              Sign Up
            </Typography>
            <div className={s.button_icon_group} role="group" aria-label="Social sign up">
              <GoogleButton />
              <button onClick={onClickHandler} aria-label="Sign up with GitHub">
                <GithubSvgrepoCom31 width={36} height={36} viewBox="0 0 24 24" />
              </button>
            </div>
            <div className={s.input_group}>
              <InputUserName
                {...register('username')}
                disabled={isSubmitting}
                error={!!errors.username?.message}
                helperText={errors.username?.message}
              />

              <InputEmail
                {...register('email')}
                disabled={isSubmitting}
                error={!!errors.email?.message}
                helperText={errors.email?.message}
              />

              <InputPassword
                {...register('password')}
                disabled={isSubmitting}
                error={!!errors.password?.message}
                helperText={errors.password?.message}
              />

              <InputPassword
                {...register('confirmPassword')}
                disabled={isSubmitting}
                subTitle={'Password confirmation'}
                error={
                  !!errors.confirmPassword?.message ||
                  (password !== confirmPassword && !!confirmPassword)
                }
                helperText={
                  errors.confirmPassword?.message ||
                  (password !== confirmPassword ? "Passwords don't match" : undefined)
                }
              />
            </div>
            <div className={s.checkbox_wrapper}>
              <Controller
                name="agreement"
                control={control}
                rules={{ required: 'You must accept the terms' }}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-labelledby="terms-label"
                    disabled={isSubmitting}
                  />
                )}
              />
              <span id="terms-label">
                I agree to the{' '}
                <Link href={'/terms-of-service'} aria-label="Terms of Service">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href={'/privacy-policy'} aria-label="Privacy Policy">
                  Privacy Policy
                </Link>
              </span>
            </div>
            <div className={s.button_wrapper}>
              <Button
                disabled={isDisabled || isLoading}
                type={'submit'}
                aria-label="Sign up for a new account"
              >
                {isLoading ? 'Logging in...' : 'Sign Up'}
              </Button>
            </div>
            <Typography className={s.question}>Do you have an account?</Typography>
            <Button
              className={s.signin}
              variant={'text-button'}
              aria-label="Sign in to your account"
              asChild
            >
              <Link href={'/auth/signIn'}>Sign In</Link>
            </Button>
          </form>
        </Card>
      </div>
      <EmailSentPopup title={'Email sent'} isOpenValue={isOpenPopup} onClose={onCloseHandler}>
        <p className={s.popup_text}>We have sent a link to confirm your email to {emailUser}</p>
      </EmailSentPopup>
    </>
  )
}
export default SignUp
