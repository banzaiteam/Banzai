'use client'

import React from 'react'
import { PresentationPage } from '@/features'
import s from '@features/auth/emailVerify/ui/EmailVerify.module.scss'
import { Button } from '@shared/ui'
import Image from 'next/image'
import ImageEmailVerification from '@/assets/auth/email_verification.webp'
import { useForm } from 'react-hook-form'
import { withGuestOnly } from '@shared/lib/hoc/withGuestOnly'
import { useRouter } from 'next/navigation'

const EmailVerifyRecoveryPassword = ({ email }: { email: string }) => {
  const router = useRouter()

  const { handleSubmit, reset } = useForm<FormData>({
    mode: 'onChange',
  })

  const onSubmitHandler = async () => {
    try {
      router.push('/auth/forgot-password')
      reset()
    } catch (error: any) {
      console.log(error)
    }
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
            <div className={s.button_wrapper}>
              <Button
                variant={'primary'}
                type={'submit'}
                width={'100%'}
                aria-label="Resend verification link for a new account"
              >
                Resend link
              </Button>
            </div>
          </div>
        </form>
        <Image src={ImageEmailVerification} alt={'Email Verification Image'} />
      </PresentationPage>
    </>
  )
}

export default withGuestOnly(EmailVerifyRecoveryPassword)
