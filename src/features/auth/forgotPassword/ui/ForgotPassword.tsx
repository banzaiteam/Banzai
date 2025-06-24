'use client'
import { Button, Card, Recaptcha, Typography } from '@shared/ui'
import { SubmitHandler, useForm } from 'react-hook-form'
import s from './ForgotPassword.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo, useRef, useState } from 'react'
import { EmailSentPopup, InputEmail } from '@features/auth/components'
import Link from 'next/link'
import { useRecoveryPasswordMutation } from '@features/auth/forgotPassword/api/forgotPasswordApi'
import {
  ForgotPasswordSchema,
  ForgotPasswordValues,
} from '@features/auth/forgotPassword/model/forgotPasswordSchema'
import { withGuestOnly } from '@shared/lib/hoc/withGuestOnly'
import { RecaptchaRef } from '@shared/ui/recaptcha/Recaptcha'

const ForgotPassword = () => {
  const [recoveryPassword, { isSuccess }] = useRecoveryPasswordMutation()
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
  const [emailUser, setEmailUser] = useState('epam@epam.com')

  const recaptchaComponentRef = useRef<RecaptchaRef>(null)

  const handleRecoveryFlow = async (email: string) => {
    try {
      await recoveryPassword({
        email,
        recaptchaToken: recaptchaToken as string,
      }).unwrap()

      setEmailUser(email)
      setIsOpenPopup(true)
      reset()
      setRecaptchaToken(null)
      recaptchaComponentRef.current?.resetCaptcha()
    } catch (error: any) {
      if (error.status === 404) {
        setError('email', {
          type: 'manual',
          message: `User with this email doesn't exist`,
        })
      } else {
        console.error('Something went wrong. Please try again.')
      }
      setRecaptchaToken(null)
      recaptchaComponentRef.current?.resetCaptcha()
    }
  }

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setError,
    formState: { errors, isValid },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: { email: '' },
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ForgotPasswordValues> = async data => {
    if (!recaptchaToken) return
    await handleRecoveryFlow(data.email)
  }

  const onCloseHandler = () => {
    setIsOpenPopup(false)
    setEmailUser('')
  }

  const handleResendLink = async () => {
    const currentEmail = getValues('email') || emailUser
    await handleRecoveryFlow(currentEmail)
  }

  return (
    <>
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'} className={s.h1}>
          Forgot Password
        </Typography>
        <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
          <InputEmail
            {...register('email')}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
          />
          <Typography variant={'regular_text_14'} className={s.formDescription}>
            Enter your email address and we will send you further instructions
          </Typography>
          {!isSuccess ? (
            <Button
              variant={'primary'}
              className={s.buttonPrimary}
              disabled={!isValid || !recaptchaToken}
            >
              Send Link
            </Button>
          ) : (
            <div className={s.alternativeContent}>
              <Typography as={'span'} variant={'regular_text_14'}>
                {'The link has been sent by email.'} <br />
                {'If you don’t receive an email, send the link again'}
              </Typography>
              <Button
                variant={'primary'}
                className={s.buttonPrimary}
                onClick={handleResendLink}
                disabled={!isValid || !recaptchaToken}
              >
                Send Link Again
              </Button>
            </div>
          )}
        </form>
        <div className={s.buttonWrapper}>
          <Button
            variant={'text-button'}
            className={s.buttonText}
            aria-label={'Back to Sign in'}
            asChild
          >
            <Link href={'/auth/signIn'}>Back to Sign in</Link>
          </Button>
        </div>
        <Recaptcha
          ref={recaptchaComponentRef}
          onVerifyAction={setRecaptchaToken}
          className={s.recaptcha}
        />
      </Card>
      <EmailSentPopup title={'Email sent'} isOpenValue={isOpenPopup} onClose={onCloseHandler}>
        <p>We have sent a link to confirm your email to {emailUser}</p>
      </EmailSentPopup>
    </>
  )
}
export default withGuestOnly(ForgotPassword)
