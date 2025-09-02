'use client'
import ReCAPTCHA from 'react-google-recaptcha'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import s from './Recaptcha.module.scss'
import clsx from 'clsx'

type Props = {
  className?: string
  error?: string | null
  onVerifyAction: (value: string | null) => void
}

export type RecaptchaRef = {
  resetCaptcha: () => void
}

export const Recaptcha = forwardRef<RecaptchaRef, Props>(
  ({ className, error, onVerifyAction }, ref) => {
    const siteKey = process.env.NEXT_PUBLIC_SITE_KEY ?? ''
    const recaptchaRef = useRef<ReCAPTCHA | null>(null)

    const onChangeHandler = (value: string | null) => {
      onVerifyAction(value)
    }

    // экспортируем resetCaptcha наружу
    useImperativeHandle(ref, () => ({
      resetCaptcha: () => {
        recaptchaRef.current?.reset()
      },
    }))

    return (
      <div className={clsx(s.container, className, { [s.errorBorder]: error })}>
        <ReCAPTCHA ref={recaptchaRef} sitekey={siteKey} onChange={onChangeHandler} theme="dark" />
        {error && <span className={s.errorLabel}>{error}</span>}
      </div>
    )
  }
)

Recaptcha.displayName = 'Recaptcha'
