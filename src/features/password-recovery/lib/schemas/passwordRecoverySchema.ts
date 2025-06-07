import { z } from 'zod'

export const passwordRecoverySchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Email is required' })
        .email({ message: 'Incorrect email address' }),
})