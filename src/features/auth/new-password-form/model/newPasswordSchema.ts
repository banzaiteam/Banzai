import { z } from 'zod'
import { passwordInputSchema } from '../../model/schemas/passwordInputSchema'
import { confirmPasswordInputSchema } from '../../model/schemas/confirmPasswordInputSchema'

export const newPasswordSchema = z
  .object({
    password: passwordInputSchema,
    confirmPassword: confirmPasswordInputSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
