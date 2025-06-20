import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Incorrect email address' }),
})

export type ForgotPasswordValues = z.infer<typeof ForgotPasswordSchema>