import { z } from 'zod'
import { newPasswordSchema } from './newPasswordSchema'

export type PasswordResetRequest = {
  email: string
  password: string
}

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>

type SuccessResponse = {
  status: 'success'
  message?: string
}

type ErrorResponse = {
  status: 'error'
  error: string
  message?: string
}

type RedirectResponse = {
  status: 'redirect'
  redirectUrl: string
  message?: string
}

//export type ResetPasswordResponse = SuccessResponse | ErrorResponse | RedirectResponse

export type ResetPasswordResponse = void
