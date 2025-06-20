'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { LoginFormValues, loginSchema } from '../model/loginSchema'
import { useLoginInMutation } from '../api/loginApi'

import { Button, Card, Typography } from '@/shared/ui'

import styles from './LoginForm.module.scss'
import { GithubSvgrepoCom31, GoogleSvgrepoCom1 } from '@/assets/icons/components'
import { InputEmail, InputPassword } from '@features/auth/components'
import { isApiError } from '@features/auth/login/model/types'
import { useAppDispatch } from '@shared/hooks/useAppDispatch'
import { login as loginAction } from '@shared/store/slices/appSlice'
import { withGuestOnly } from '@shared/lib/hoc/withGuestOnly'
import Link from 'next/link'

const LoginForm = () => {
  const router = useRouter()
  const [retryDelay, setRetryDelay] = useState(0)
  const dispatch = useAppDispatch()

  const [login, { isLoading }] = useLoginInMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    if (retryDelay > 0) return

    try {
      const response = await login(data).unwrap()
      // console.log(response);
      localStorage.setItem('accessToken', response.accessToken)
      reset()
      router.push('/')

      dispatch(loginAction())
    } catch (error) {
      let errorMessage = 'Login failed. Please try again.'
      console.error('Login failed:', error)

      if (isApiError(error)) {
        errorMessage = error.data.message || `Error ${error.status}: ${error.data.statusCode}`
      } else {
        setRetryDelay(5)
        const interval = setInterval(() => {
          setRetryDelay(prev => {
            if (prev <= 1) clearInterval(interval)
            return prev - 1
          })
        }, 1000)
      }
    }
  }

  return (
    <Card className={styles.singIn}>
      <div className={styles.block}>
        <Typography className={styles.title} variant="h1" as={'h1'}>
          Sign In
        </Typography>
        <div className={styles.box}>
          <button role={'button'} className={styles.btn}>
            <GoogleSvgrepoCom1 width={36} height={36} />
          </button>
          <button role={'button'} className={styles.btn}>
            <GithubSvgrepoCom31 width={36} height={36} />
          </button>
        </div>
        <form className={styles.block} onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputEmail
            placeholder="Enter your email"
            {...register('email')}
            helperText={errors.email?.message}
            error={!!errors.email?.message}
          />

          <InputPassword
            placeholder="Enter your password"
            {...register('password')}
            helperText={errors.password?.message}
            error={!!errors.password?.message}
          />
          <Button className={styles.forgotPassword} type={'button'} variant={'text-button'}>
            Forgot password
          </Button>

          <Button
            variant={'primary'}
            className={styles.w100}
            type="submit"
            disabled={isLoading || retryDelay > 0}
          >
            {retryDelay > 0
              ? `Try again in ${retryDelay}s`
              : isLoading
                ? 'Logging in...'
                : 'Sign In'}
          </Button>
          <Button
            className={`${styles.w100} ${styles.bntMiddle}`}
            variant={'text-button'}
            type="button"
          >
            <Link href={'/signup'}>Don't have an account?</Link>
          </Button>
          <Button
            className={`${styles.w100} ${styles.btnBottom}`}
            variant={'text-button'}
            type="button"
            onClick={() => router.push('/signup')}
          >
            <Link href={'/signup'}>Sign Up</Link>
          </Button>
        </form>
      </div>
    </Card>
  )
}

export default withGuestOnly(LoginForm)
