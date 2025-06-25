import { useForm } from 'react-hook-form'
import { type FormDataSignUp, schemaSignUp } from '@features/auth/signUp/model/schemas/signUpSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

export const useSignUpForm = () => {
  const signUpForm = useForm<FormDataSignUp>({
    resolver: zodResolver(schemaSignUp),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreement: true,
    },
    mode: 'onBlur',
  })
  const {
    watch,
    trigger,
    formState: { isValid, isDirty },
  } = signUpForm

  const isDisabled = !isDirty || !isValid
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const agreement = watch('agreement')
  useEffect(() => {
    trigger('agreement')
  }, [agreement, trigger]) // для disabled button correctly
  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword')
    }
  }, [password, trigger, confirmPassword]) //для проверки схожести пароля и его confirmation

  return { signUpForm, isDisabled, password, confirmPassword }
}
