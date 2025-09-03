import { z } from 'zod'
import { usernameInputSchema } from '../../../model/schemas/usernameInputSchema'
import { emailInputSchema } from '../../../model/schemas/emailInputSchema'
import { passwordInputSchema } from '../../../model/schemas/passwordInputSchema'
import { confirmPasswordInputSchema } from '../../../model/schemas/confirmPasswordInputSchema'
import { agreementSchema } from '../../../model/schemas/agreementSchema'

export const schemaSignUp = z
  .object({
    username: usernameInputSchema,
    email: emailInputSchema,
    password: passwordInputSchema,
    confirmPassword: confirmPasswordInputSchema,
    agreement: agreementSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // Указываем, к какому полю привязать ошибку
  })

export type FormDataSignUp = z.infer<typeof schemaSignUp>
