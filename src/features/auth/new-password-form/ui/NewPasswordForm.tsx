'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, Button, Typography } from '@/shared/ui'
import styles from './NewPasswordForm.module.scss'
import { InputPassword } from '@/features/auth/components'
import { useResetPasswordMutation } from '../api/newPasswordApi'
import { NewPasswordFormValues, PasswordResetRequest } from '../model/types'
import { newPasswordSchema } from '../model/newPasswordSchema'

export const NewPasswordForm = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [resetPassword] = useResetPasswordMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
  })

  // Функция для извлечения email из пути
  const getEmailFromPath = () => {
    if (pathname?.startsWith('/auth/restore-password/')) {
      const parts = pathname.split('/')
      const emailPart = parts[parts.length - 1]
      try {
        return decodeURIComponent(emailPart)
      } catch {
        return null
      }
    }
    return null
  }

  const onSubmit = async (data: NewPasswordFormValues) => {
    setIsSubmitting(true)

    try {
      // Получаем email из пути URL https://yogram.ru/auth/restore-password/{email}
      const email = getEmailFromPath()
      if (!email) {
        throw new Error('Email not found in URL')
      }
      // Отправляем запрос
      await resetPassword({
        email,
        password: data.password,
      }).unwrap()

      setSuccessMessage('Password has been successfully changed!')

      router.push('/auth/signIn')
    } catch (err: any) {
      if (err.data?.message) {
        setError('root', { message: err.data.message })
      } else {
        setError('root', { message: 'Failed to reset password. Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={styles.newPassword}>
      <div className={styles.block}>
        <Typography className={styles.title} variant="h1" as="h1">
          Create New Password
        </Typography>

        <form className={styles.block} onSubmit={handleSubmit(onSubmit)} noValidate>
          <InputPassword
            subTitle="New password"
            {...register('password')}
            helperText={errors.password?.message}
            error={!!errors.password?.message}
          />

          <div>
            <InputPassword
              subTitle="Password confirmation"
              {...register('confirmPassword')}
              helperText={errors.confirmPassword?.message}
              error={!!errors.confirmPassword?.message}
            />
            <span className={styles.text}>Your password must be between 6 and 20 characters</span>
          </div>

          <Button
            width="100%"
            variant="primary"
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Create New Password'}
          </Button>
        </form>
      </div>
    </Card>
  )
}
