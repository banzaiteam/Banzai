'use client'
import { Button, Card, Input, Recaptcha, Typography } from '@shared/ui'
import { SubmitHandler, useForm } from 'react-hook-form'
import s from './ForgotPassword.module.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useMemo, useState } from 'react'
import { EmailSentPopup } from '@features/auth/components'
import Link from 'next/link'
import { useRecoveryPasswordMutation } from '@features/auth/forgotPassword/api/forgotPasswordApi'
import {
  ForgotPasswordSchema,
  ForgotPasswordValues,
} from '@features/auth/forgotPassword/model/forgotPasswordSchema'

export const ForgotPassword = () => {
  const [recoveryPassword, { isSuccess }] = useRecoveryPasswordMutation()
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null)
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false)
  const [emailUser, setEmailUser] = useState('epam@epam.com')
  const [recaptchaKey, setRecaptchaKey] = useState(0)

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
    console.log(recaptchaToken)

    try {
      await recoveryPassword({
        email: data.email, // Передаем только email в тело запроса
        recaptchaToken, // reCAPTCHA-токен передается в headers, но в теле запроса НЕ нужен
      }).unwrap()

      setEmailUser(getValues('email'))
      setIsOpenPopup(true)
      reset()
      setRecaptchaToken(null)
    } catch (error: any) {
      if (error.status === 404) {
        setError('email', {
          type: 'manual',
          message: `User with this email doesn't exist`,
          //message: error.data.message,
        })
        setRecaptchaToken(null)
        setRecaptchaKey(prev => prev + 1) // перерисовываем Recaptcha
      } else {
        console.log('Something went wrong. Please try again.')
      }
    }
  }

  const onCloseHandler = () => {
    setIsOpenPopup(false)
    setEmailUser('')
  }

  const handleResendLink = async () => {
    await recoveryPassword({
      email: emailUser,
      recaptchaToken: recaptchaToken as string,
    }).unwrap()

    reset()
    setRecaptchaToken(null)
  }

  const memorizedRecaptcha = useMemo(() => {
    if (isSuccess) return null

    return (
      <Recaptcha key={recaptchaKey} onVerifyAction={setRecaptchaToken} className={s.recaptcha} />
    )
  }, [isSuccess, recaptchaKey])

  return (
    <>
      <Card className={s.card}>
        <Typography as={'h1'} variant={'h1'} className={s.h1}>
          Forgot Password
        </Typography>
        <form className={s.container} onSubmit={handleSubmit(onSubmit)}>
          <Input
            type={'email'}
            subTitle={'Email'}
            error={!!errors.email?.message}
            helperText={errors.email?.message}
            {...register('email')}
          ></Input>
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
              <Button variant={'primary'} className={s.buttonPrimary} onClick={handleResendLink}>
                {'Send Link Again'}
              </Button>
            </div>
          )}
        </form>
        <div className={s.buttonWrapper}>
          <Button variant={'text-button'} className={s.buttonText} aria-label={'Back to Sign in'}>
            <Link href={'/auth/signIn'}>Back to Sign in</Link>
          </Button>
        </div>
        {memorizedRecaptcha}
      </Card>
      <EmailSentPopup title={'Email sent'} isOpenValue={isOpenPopup} onClose={onCloseHandler}>
        <p>We have sent a link to confirm your email to {emailUser}</p>
      </EmailSentPopup>
    </>
  )
}
