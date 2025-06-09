import {z} from 'zod';

export const loginSchema = z.object({
  email: z.string()
    .min(4, 'Email must be at least 4 characters long.')
    .email('Invalid email address')
    .trim(),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(16, 'Password must be at most 16 characters')
    .regex(/[0-9]/, {message: 'Contain at least one number.'})
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

