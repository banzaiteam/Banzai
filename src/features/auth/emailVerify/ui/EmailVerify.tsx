'use client'
import { Button, Input } from '@shared/ui'
import s from './EmailVerify.module.scss'
import Image from 'next/image'
import ImageEmailVerification from '@/assets/auth/email_verification.webp'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { type FormDataSignUp } from '@features/auth/signUp/model/schemas/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useSendVerifyEmailMutation } from '@features/auth/signUp/api/signUp.api'
import { z } from 'zod'
import { PresentationPage } from '@/features'
import { EmailSentPopup } from '@features/auth/components'
import { emailInputSchema } from '../../model/schemas/emailInputSchema'

const schema = z.object({
  email: emailInputSchema,
})

type FormData = z.infer<typeof schema>

export const EmailVerify = () => {
  const [sendVerifyEmail, { isLoading }] = useSendVerifyEmailMutation()
  const [isOpenPopup, setIsOpenPopup] = useState(false)
  const [emailUser, setEmailUser] = useState('epam@epam.com')

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(
      z.object({
        email: emailInputSchema,
      })
    ),
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
  })
  const isDisabled = !isDirty || !isValid
  const onSubmitHandler: SubmitHandler<Pick<FormDataSignUp, 'email'>> = async ({ email }) => {
    try {
      await sendVerifyEmail({ email }).unwrap()
      setEmailUser(getValues('email'))
      reset()
    } catch (error: unknown) {
      console.log(error)
      const errorApi = error as { status: number; data: { message: string } }
      if (errorApi.status === 400 || errorApi.status === 401) {
        setError('email', {
          type: 'manual',
          message: errorApi.data.message,
        })
      }
      return
    }

    setIsOpenPopup(true)
  }
  const onCloseHandler = () => {
    setIsOpenPopup(false)
    setEmailUser('epam@epam.com')
  }

  return (
    <>
      <PresentationPage
        title={'Email verification link expired'}
        subTitle={
          'Looks like the verification link has expired. Not to worry, we can send the link again'
        }
      >
        <form onSubmit={handleSubmit(onSubmitHandler)} role="form" aria-labelledby="signup-heading">
          <div className={s.email_block}>
            <Input
              {...register('email')}
              disabled={isSubmitting}
              subTitle={'Email'}
              type={'email'}
              placeholder={'Epam@epam.com'}
              aria-required="true"
              error={!!errors.email?.message}
              helperText={errors.email?.message}
            />
            <div className={s.button_wrapper}>
              <Button
                disabled={isDisabled || isLoading}
                variant={'primary'}
                type={'submit'}
                width={'100%'}
                aria-label="Resend verification link for a new account"
              >
                {isLoading ? 'Logging in...' : 'Resend verification link'}
              </Button>
            </div>
          </div>
        </form>
        <Image src={ImageEmailVerification} alt={'Email Verification Image'} />
      </PresentationPage>
      <EmailSentPopup title={'Email sent'} isOpenValue={isOpenPopup} onClose={onCloseHandler}>
        <p className={s.popup_text}>We have sent a link to confirm your email to {emailUser}</p>
      </EmailSentPopup>
    </>
  )
}
